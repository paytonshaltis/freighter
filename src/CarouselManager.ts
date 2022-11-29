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

  /**
   * Constructor for the CarouselManager class. Initializes the Carousel by
   * passing the options parameter to the Carousel constructor. Assigns the
   * returned carousel to the carousel member attribute.
   * @param {CarouselOptions} options Carousel options to be passed to the Carousel constructor.
   */
  constructor(options: CarouselOptions) {
    // Need to remove all event listeners from the carousel container.
    this.carousel = new Carousel(options);
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
   */
  private changeCarouselOptions(options: CarouselOptions): void {
    // Should first validate and convert all carousel options.
    validateCarouselOptions(options);
    convertCarouselOptions(options);

    // Need to remove all event listeners from the carousel container.
    this.carousel.removeAllEventListeners();

    // Create a new carousel with the updated options.
    this.carousel = new Carousel(options);
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
    console.log("Added item at index", index);
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
    const currentState = this.carousel.getCurrentState();
    index
      ? currentState.allCarouselItems.splice(index, 0, ...items)
      : currentState.allCarouselItems.push(...items);

    // Create a new carousel with the updated options.
    this.changeCarouselOptions({
      ...currentState,
      allCarouselItems: currentState.allCarouselItems,
    } as CarouselState);
    console.log("Added item(s) at index", index);
  }

  /**
   * Removes a number of carousel items starting from the given index.
   * By default, this method just returns the item at this index, but
   * the number of items to remove can be specified.
   * @param {number} index The index of the item to be removed.
   * @param {number} count Optional number of items to remove. Defaults to 1.
   */
  public removeCarouselItems(index: number, count: number = 1): void {
    // Remove the item at the specified index.
    const currentState = this.carousel.getCurrentState();
    currentState.allCarouselItems.splice(index, count);

    // Create a new carousel with the updated options.
    this.changeCarouselOptions({
      ...currentState,
      allCarouselItems: currentState.allCarouselItems,
    } as CarouselState);
    console.log("Removed item at index", index);
  }
}
