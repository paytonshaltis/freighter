import Carousel from "./Carousel.js";
import CarouselOptions, {
  convertCarouselOptions,
  validateCarouselOptions,
} from "./types/CarouselOptions.type.js";
import CarouselProperties from "./types/CarouselProperties.type.js";
import CarouselState, { equalStates } from "./types/CarouselState.type.js";

/**
 * Class responsible for managing an instance of the Carousel class. Includes
 * a single member attribute, the Carousel instance itself, whose reference
 * may freely change.
 */
export default class Freighter {
  private carousel: Carousel;
  private populateResizeObserver: ResizeObserver | null;

  /**
   * Constructor for the CarouselManager class. Initializes the Carousel by
   * passing the options parameter to the Carousel constructor. Assigns the
   * returned carousel to the carousel member attribute.
   * @param {CarouselOptions} options Carousel options to be passed to the Carousel constructor.
   */
  constructor(options: CarouselOptions) {
    // Throw an error if the constructor is called with no options.
    if (!options) {
      throw new Error("Carousel options must be provided.");
    }

    // Reassign the carousel member attribute to a new Carousel instance
    // with the updated options.
    this.populateResizeObserver = null;
    this.carousel = this.changeCarouselOptions(options);
  }

  /**
   * Changes the carousel properties to those provided as arguments. Note that
   * not all carousel properties can be changed, such as the wrap and resize
   * methods.
   * @param {CarouselProperties} properties The new carousel properties.
   * @returns {void} Nothing.
   */
  public setCarouselProperties(properties: CarouselProperties): void {
    // Create a new carousel with the updated options.
    const state = this.carousel.getCurrentState();
    this.changeCarouselOptions({
      ...state,
      ...properties,
      buttonStyles: { ...state.buttonStyles, ...properties.buttonStyles },
      buttonHoverStyles: {
        ...state.buttonHoverStyles,
        ...properties.buttonHoverStyles,
      },
      leftButtonStyles: {
        ...state.leftButtonStyles,
        ...properties.leftButtonStyles,
      },
      leftButtonHoverStyles: {
        ...state.leftButtonHoverStyles,
        ...properties.leftButtonHoverStyles,
      },
      rightButtonStyles: {
        ...state.rightButtonStyles,
        ...properties.rightButtonStyles,
      },
      rightButtonHoverStyles: {
        ...state.rightButtonHoverStyles,
        ...properties.rightButtonHoverStyles,
      },
    } as CarouselState);
  }

  /**
   * Retrieves the current state of the carousel and returns it. This includes
   * internal data not specified in the original options or updated properties,
   * such as the carousel items themselves and the current carousel pointer.
   * @returns {CarouselState} The current state of the carousel.
   */
  public getCarouselProperties(): CarouselState {
    return this.carousel.getCurrentState();
  }

  /**
   * Adds a new item to the carousel. The item is added to the end of the
   * carousel by default, but an optional index can be provided.
   * @param {HTMLElement | HTMLElement[]} items The item(s) to be added to
   * the carousel.
   * @param {number} index Optional index at which to add the item. Adds to
   * the end of the carousel by default.
   */
  public addCarouselItems(
    items: HTMLElement | HTMLElement[],
    index?: number
  ): void {
    // Call the helper with either an array of one item or the entire array.
    if ((items as HTMLElement[]).length !== undefined) {
      this.addCarouselItemsHelper(items as HTMLElement[], index);
    } else {
      this.addCarouselItemsHelper([items as HTMLElement], index);
    }
  }

  /**
   * Removes a number of carousel items starting from the given index.
   * By default, this method just returns the item at this index, but
   * the number of items to remove can be specified.
   * @param {number} index The index of the item to be removed.
   * @param {number} count Optional number of items to remove. Defaults to 1.
   */
  public removeCarouselItems(index: number, count: number = 1): void {
    const state = this.carousel.getCurrentState();

    // Throw appropriate errors is fields are missing. Mainly to suppress TS errors.
    if (!state.numItemsVisible) {
      throw new Error(
        "Number of items visible is undefined, but required for 'stretch-populate' recalculations."
      );
    }

    // If wrapping is not allowed for the carousel, then removing items must move
    // the bottom pointer slightly as to not show duplicates.
    if (
      state.wrappingMethod === "none" ||
      state.wrappingMethod === "wrap-smart"
    ) {
      // If the carousel is scrolled to the end, need to move the bottom pointer
      // back by the number of items removed.
      if (
        state.leftCarouselPointer + state.numItemsVisible ===
        state.carouselItems.length
      ) {
        state.leftCarouselPointer -= count;
      }

      // If the top pointer will shift back to the other end of the carousel, need
      // to move the index back by the number of items removed.
      while (
        state.leftCarouselPointer + state.numItemsVisible >=
        state.carouselItems.length - count
      ) {
        state.leftCarouselPointer -= count;
      }

      // If the bottom pointer shifted into the negatives, reset it to 0.
      if (state.leftCarouselPointer < 0) {
        state.leftCarouselPointer = 0;
      }
    }

    // Remove the item at the specified index.
    state.carouselItems.splice(index, count);

    // Create a new carousel with the updated options.
    this.changeCarouselOptions({
      ...state,
      carouselItems: [...state.carouselItems],
    } as CarouselState);
  }

  /**
   * Reassigns the carousel member attribute to a new Carousel instance
   * with the given options. This method is private, and is only called
   * by more formalized methods that can change the carousel options.
   * Passed options are validated, converted, and event listeners are
   * removed from the current carousel before the new carousel is
   * instantiated.
   * @param {CarouselOptions} options The new options to be passed to the
   * Carousel constructor.
   * @returns {Carousel} The new Carousel instance; allows constructor of
   * CarouselManager to call this method directly.
   */
  private changeCarouselOptions(options: CarouselOptions): Carousel {
    // Don't do anything if the options are the same as the current carousel.
    if (
      this.carousel &&
      equalStates(options as CarouselState, this.carousel.getCurrentState())
    ) {
      console.warn(
        "The new Carousel options are the same as the current ones."
      );
      return this.carousel;
    }

    // If the carousel is using stretch-populate, then the carousel manager
    // needs to check on each resize event to see if the carousel needs to
    // be re-initialized.
    this.populateResizeObserver =
      options.resizingMethod === "stretch-populate"
        ? new ResizeObserver(this.recalculateCarouselPopulation.bind(this))
        : null;

    // Should first validate and convert all carousel options.
    validateCarouselOptions(options);
    convertCarouselOptions(options);

    // Need to remove all event listeners from the carousel container.
    if (this.carousel) {
      this.carousel.removeAllEventListeners();
    }

    // Disconnect the observer if it exists.
    this.populateResizeObserver?.disconnect();

    // Create a new carousel with the updated options.
    this.carousel = new Carousel(options);

    // Attach the resize observer to the carousel container after it
    // has been initialized.
    if (this.populateResizeObserver) {
      this.populateResizeObserver.observe(
        this.carousel.getCurrentState().carouselContainer.parentElement!
      );
      // Should also repopulate for the first time if using stretch-populate.
      this.recalculateCarouselPopulation();
    }

    return this.carousel;
  }

  /**
   * Continuously calls the recalculateCarouselPopulationHelper method until
   * the carousel is populated to the maximum extent possible.
   * @returns {void} Nothing.
   */
  private recalculateCarouselPopulation(): void {
    while (this.recalculateCarouselPopulationHelper());
  }

  /**
   * Tries to recalculate the extent to which a carousel should be populated.
   * Decreases the number of visible items if there is no more room, and increases
   * the number of visible items if there is room. Returns true if the carousel
   * was able to add or remove an item, suggesting that more can be done.
   * @returns {boolean} True if the carousel was able to add or remove an item,
   * suggesting that the method be called again to see if more can be done.
   */
  private recalculateCarouselPopulationHelper(): boolean {
    const state = this.carousel.getCurrentState();
    let populatedOrDepopulated = false;

    // Throw appropriate errors is fields are missing. Mainly to suppress TS errors.
    if (!state.itemWidth) {
      throw new Error(
        "Item width is undefined, but required for 'stretch-populate' recalculations."
      );
    }
    if (!state.itemSpacing) {
      throw new Error(
        "Item spacing is undefined, but required for 'stretch-populate' recalculations."
      );
    }
    if (!state.numItemsVisible) {
      throw new Error(
        "Number of items visible is undefined, but required for 'stretch-populate' recalculations."
      );
    }

    // Compute the total gap size of the carousel.
    const totalGapSize =
      parseFloat(getComputedStyle(state.carouselContainer).width) -
      state.numItemsVisible * state.itemWidth;

    // Determine if there is enough room to increase numItemsVisible.
    if (
      totalGapSize >
      state.itemWidth + (state.numItemsVisible + 1) * state.itemSpacing
    ) {
      // If wrapping is not allowed for the carousel, then decreasing number of
      // items visible must move the bottom pointer slightly to not show duplicates.
      if (
        state.wrappingMethod === "none" ||
        state.wrappingMethod === "wrap-smart"
      ) {
        // If the carousel is scrolled to the end, need to move the bottom pointer
        // back by one.
        if (
          state.leftCarouselPointer + state.numItemsVisible ===
          state.carouselItems.length
        ) {
          state.leftCarouselPointer--;
        }

        // If this becomes negative, reset to 0.
        if (state.leftCarouselPointer < 0) {
          state.leftCarouselPointer = 0;
        }
      }

      // Increase the number of visible items. If the wrap type is none, then do
      // not allow the number of visible items to exceed the number of items in
      // the carousel.
      if (
        !(
          state.wrappingMethod === "none" &&
          state.numItemsVisible > state.carouselItems.length
        )
      ) {
        this.changeCarouselOptions({
          ...state,
          numItemsVisible: state.numItemsVisible + 1,
        } as CarouselState);
        populatedOrDepopulated = true;
      }
    }

    // Determine if there is not enough room and should reduce numItemsVisible.
    else if (totalGapSize < state.numItemsVisible * state.itemSpacing) {
      // Make sure to not remove items if the carousel only has 1 item visible,
      // and decrease the number of visible items.
      if (state.numItemsVisible > 1) {
        this.changeCarouselOptions({
          ...state,
          numItemsVisible: state.numItemsVisible - 1,
        } as CarouselState);
        populatedOrDepopulated = true;
      }
    }

    return populatedOrDepopulated;
  }

  /**
   * Adds new items to the carousel. The items are added to the end of the
   * carousel by default, but an optional index can be provided.
   * @param {HTMLElement[]} items The items to be added to the carousel.
   * @param {number} index Optional index at which to add the items. Adds to
   * the end of the carousel by default.
   */
  private addCarouselItemsHelper(items: HTMLElement[], index?: number): void {
    // Add the new item either at the end or at the specified index.
    const state = this.carousel.getCurrentState();
    index !== undefined
      ? state.carouselItems.splice(index, 0, ...items)
      : state.carouselItems.push(...items);

    // Create a new carousel with the updated options.
    this.changeCarouselOptions({
      ...state,
      carouselItems: [...state.carouselItems],
    } as CarouselState);
  }
}
