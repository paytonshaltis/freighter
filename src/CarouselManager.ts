import Carousel from "./Carousel.js";
import CarouselOptions from "./types/CarouselOptions.type.js";
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
   * @param options Carousel options to be passed to the Carousel constructor.
   */
  constructor(options: CarouselOptions) {
    // Need to remove all event listeners from the carousel container.
    this.carousel = new Carousel(options);
  }

  private changeCarouselOptions(options: CarouselOptions): void {
    this.removeAllEventListners();
    this.carousel = new Carousel(options);
  }

  private getCurrentState(): CarouselState {
    return this.carousel.getCurrentState();
  }

  private removeAllEventListners(): void {
    this.carousel.removeAllEventListeners();
  }

  /**
   * Adds a new item to the carousel. The item is added to the end of the
   * carousel by default, but an optional index can be provided. Note that
   * this operation involves the instantiation of a new Carousel instance
   * that replaces the current one.
   * @param {HTMLElement} item The item to be added to the carousel.
   * @param {number} index Optional index at which to add the item. Adds to
   * the end of the carousel by default.
   */
  public addCarouselItem(item: HTMLElement, index?: number): void {
    this.addCarouselItems([item], index);
  }

  /**
   * Adds new items to the carousel. The items are added to the end of the
   * carousel by default, but an optional index can be provided. Note that
   * this operation involves the instantiation of a new Carousel instance
   * that replaces the current one.
   * @param {HTMLElement[]} items The items to be added to the carousel.
   * @param {number} index Optional index at which to add the items. Adds to
   * the end of the carousel by default.
   */
  public addCarouselItems(items: HTMLElement[], index?: number): void {
    // Add the new item either at the end or at the specified index.
    const currentState = this.getCurrentState();
    index
      ? currentState.allCarouselItems.splice(index, 0, ...items)
      : currentState.allCarouselItems.push(...items);

    // Create a new carousel with the updated options.
    this.changeCarouselOptions({
      ...currentState,
      allCarouselItems: currentState.allCarouselItems,
    } as CarouselState);
  }

  /**
   * Removes a number of carousel items starting from the given index.
   * By default, this method just returns the item at this index, but
   * the number of items to remove can be specified. Note that this
   * operation involves the instantiation of a new Carousel instance
   * that replaces the current one.
   * @param {number} index The index of the item to be removed.
   * @param {number} count Optional number of items to remove. Defaults to 1.
   */
  public removeCarouselItem(index: number, count: number = 1): void {
    // Remove the item at the specified index.
    const currentState = this.getCurrentState();
    currentState.allCarouselItems.splice(index, count);

    // Create a new carousel with the updated options.
    this.changeCarouselOptions({
      ...currentState,
      allCarouselItems: currentState.allCarouselItems,
    } as CarouselState);
  }
}
