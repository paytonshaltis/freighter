import Carousel from "./Carousel.js";
import CarouselOptions, {
  convertCarouselOptions,
  validateCarouselOptions,
} from "./types/CarouselOptions.type.js";
import CarouselState from "./types/CarouselState.type.js";

/**
 * Class responsible for managing an instance of the Carousel class. Includes
 * a single member attribute, the Carousel instance itself, whose reference
 * may freely change.
 */
export default class CarouselManager {
  private carousel: Carousel;
  private populateResizeObserver: ResizeObserver | null;

  /**
   * Constructor for the CarouselManager class. Initializes the Carousel by
   * passing the options parameter to the Carousel constructor. Assigns the
   * returned carousel to the carousel member attribute.
   * @param {CarouselOptions} options Carousel options to be passed to the Carousel constructor.
   */
  constructor(options: CarouselOptions) {
    // Reassign the carousel member attribute to a new Carousel instance
    // with the updated options.
    this.populateResizeObserver = null;
    this.carousel = this.changeCarouselOptions(options);
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
        this.carousel.getCurrentState().carouselContainer
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
          console.log("moving bottom pointer back by one");
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
   * Adds a new item to the carousel. The item is added to the end of the
   * carousel by default, but an optional index can be provided.
   * @param {HTMLElement} item The item to be added to the carousel.
   * @param {number} index Optional index at which to add the item. Adds to
   * the end of the carousel by default.
   */
  public addCarouselItem(item: HTMLElement, index?: number): void {
    this.addCarouselItems([item], index);
  }

  /**
   * Adds new items to the carousel. The items are added to the end of the
   * carousel by default, but an optional index can be provided.
   * @param {HTMLElement[]} items The items to be added to the carousel.
   * @param {number} index Optional index at which to add the items. Adds to
   * the end of the carousel by default.
   */
  public addCarouselItems(items: HTMLElement[], index?: number): void {
    // Add the new item either at the end or at the specified index.
    const state = this.carousel.getCurrentState();
    index !== undefined
      ? state.carouselItems.splice(index, 0, ...items)
      : state.carouselItems.push(...items);

    // Create a new carousel with the updated options.
    this.changeCarouselOptions({
      ...state,
      carouselItems: state.carouselItems,
    } as CarouselState);
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
      carouselItems: state.carouselItems,
    } as CarouselState);
  }
}
