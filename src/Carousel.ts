// Constructor with single object parameter.
type CarouselOptions = {
  carouselItemWidth: number;
  carouselItemHeight: number;
  carouselItemSpacing: number;
  carouselButtonWidth: number;
  carouselButtonHeight: number;
  carouselItemsVisible: number;
  carouselScrollBy: number;
  carouselContainerId: string;
};

export default class Carousel {
  // Carousel display attributes.
  private carouselItemWidth: number;
  private carouselItemHeight: number;
  private carouselItemSpacing: number;
  private carouselButtonWidth: number;
  private carouselButtonHeight: number;
  private carouselItemsVisible: number;
  private carouselScrollBy: number;

  // Carousel DOM element attributes.
  private carouselItemContainer: HTMLElement;
  private leftArrow: HTMLElement;
  private rightArrow: HTMLElement;

  // Carousel data attributes.
  private allCarouselItems: Element[];
  private allCarouselItemsTopPtr: number;
  private allCarouselItemsBottomPtr: number;
  private carouselPosition: number;
  private isScrolling: boolean;
  private prevScrollDirection: string;

  // Configure the carousel item container.
  private configureCarouselItemContainer(
    carouselContainerId: string
  ): HTMLElement {
    const selectedContainer: HTMLElement | null =
      document.getElementById(carouselContainerId);
    if (!selectedContainer) {
      throw new Error("Carousel container not found.");
    } else {
      return selectedContainer;
    }
  }

  // Configure the left arrow button.
  private configureArrow(string: "left" | "right"): HTMLElement {
    // Create and size the arrow.
    const arrow: HTMLElement = document.createElement("button");
    arrow.style.width = `${this.carouselButtonWidth}px`;
    arrow.style.height = `${this.carouselButtonHeight}px`;
    arrow.style.position = "absolute";
    arrow.style.bottom = "0";

    // Style the arrow.
    arrow.style.zIndex = "1";
    arrow.style.border = "none";
    arrow.style.backgroundColor = "#333";
    arrow.style.cursor = "pointer";
    arrow.style.opacity = "0.2";

    // Position the arrow based on the direction.
    if (string === "left") {
      arrow.style.left = "0";
    }
    if (string === "right") {
      arrow.style.right = "0";
    }

    return arrow;
  }

  // Constructor with single object parameter.
  constructor(options: CarouselOptions) {
    // Carousel display attributes.
    this.carouselItemWidth = options.carouselItemWidth;
    this.carouselItemHeight = options.carouselItemHeight;
    this.carouselItemSpacing = options.carouselItemSpacing;
    this.carouselButtonWidth = options.carouselButtonWidth;
    this.carouselButtonHeight = options.carouselButtonHeight;
    this.carouselItemsVisible = options.carouselItemsVisible;
    this.carouselScrollBy = options.carouselScrollBy;

    // Carousel DOM element attributes.
    this.carouselItemContainer = this.configureCarouselItemContainer(
      options.carouselContainerId
    );
    this.leftArrow = this.configureArrow("left");
    this.rightArrow = this.configureArrow("right");

    // Carousel data attributes.
    this.allCarouselItems = Array.from(this.carouselItemContainer.children);
    this.allCarouselItemsBottomPtr = 0;
    this.allCarouselItemsTopPtr = this.carouselItemsVisible;
    this.carouselPosition = 0;
    this.isScrolling = false;
    this.prevScrollDirection = "";

    console.log(this.carouselItemContainer, this.allCarouselItems);
  }
}
