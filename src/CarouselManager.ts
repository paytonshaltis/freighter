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

  public addCarouselItem(item: HTMLElement, index?: number): void {
    const currentState = this.getCurrentState();
    const newCarouselItems = currentState.allCarouselItems;
    index
      ? currentState.allCarouselItems.splice(index, 0, item)
      : newCarouselItems.push(item);
    const param = {
      ...currentState,
      allCarouselItems: currentState.allCarouselItems,
    };
    this.changeCarouselOptions(param);
  }
}
