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
  public carousel: Carousel;

  /**
   * Constructor for the CarouselManager class. Initializes the Carousel by
   * passing the options parameter to the Carousel constructor. Assigns the
   * returned carousel to the carousel member attribute.
   * @param {CarouselOptions} options Carousel options to be passed to the Carousel constructor.
   */
  constructor(options: CarouselOptions) {
    // Need to remove all event listeners from the carousel container.
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
  public changeCarouselOptions(options: CarouselOptions): Carousel {
    // Should first validate and convert all carousel options.
    validateCarouselOptions(options);
    convertCarouselOptions(options);

    // Need to remove all event listeners from the carousel container.
    if (this.carousel) {
      this.carousel.removeAllEventListeners();
    }

    // Create a new carousel with the updated options.
    this.carousel = new Carousel(options);
    return this.carousel;
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
