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
    this.carousel = new Carousel(options);
  }

  public getCurrentState(): CarouselOptions {
    return this.carousel.getCurrentState();
  }
}
