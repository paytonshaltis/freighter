import Carousel from "./Carousel.js";
import CarouselOptions from "./types/CarouselOptions.type.js";

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

  public changeCarouselOptions(options: Partial<CarouselOptions>): void {
    this.removeAllEventListners();
    const param = { ...this.getCurrentState(), ...options };
    this.carousel = new Carousel(param);
  }

  private getCurrentState(): CarouselOptions {
    return this.carousel.getCurrentState();
  }

  public removeAllEventListners(): void {
    this.carousel.removeAllEventListeners();
  }
}
