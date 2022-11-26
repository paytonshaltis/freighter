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
  private carouselContainer: HTMLElement;

  // Carousel data attributes.
  private static maxID: number = -1;
  private carouselID: number;
  private allCarouselItems: Element[];
  private allCarouselItemsTopPtr: number;
  private allCarouselItemsBottomPtr: number;
  private carouselPosition: number;
  private isScrolling: boolean;
  private prevScrollDirection: string;

  // Configure the carousel item container.
  private configureCarouselContainer(carouselContainerId: string): HTMLElement {
    // Throw an error if the carousel container does not exist.
    const selectedContainer: HTMLElement | null =
      document.getElementById(carouselContainerId);
    if (!selectedContainer) {
      throw new Error("Carousel container not found.");
    }

    // Store the children of the carousel container.
    const carouselItems = Array.from(selectedContainer.children);
    selectedContainer.innerHTML = "";

    // Apply the appropriate class.
    selectedContainer.classList.add("carousel-container");

    // Add the arrows and carousel item container to the carousel container.
    selectedContainer.appendChild(this.configureCarouselArrow("left"));
    selectedContainer.appendChild(
      this.configureCarouselItemContainerWrapper(carouselItems)
    );
    selectedContainer.appendChild(this.configureCarouselArrow("right"));

    return selectedContainer;
  }

  // Configure the carousel item container wrapper.
  private configureCarouselItemContainerWrapper(
    carouselItems: Element[]
  ): HTMLElement {
    // Create the carousel item container wrapper.
    const carouselItemContainerWrapper: HTMLElement =
      document.createElement("div");

    // Apply the appropriate class and id.
    carouselItemContainerWrapper.classList.add(
      "carousel-item-container-wrapper"
    );
    carouselItemContainerWrapper.id = `carousel-item-container-wrapper-${this.carouselID}`;

    // Add the carousel item container to the carousel item container wrapper.
    carouselItemContainerWrapper.appendChild(
      this.configureCarouselItemContainer(carouselItems)
    );

    return carouselItemContainerWrapper;
  }

  // Configure the carousel item container.
  private configureCarouselItemContainer(
    carouselItems: Element[]
  ): HTMLElement {
    // Create the carousel item container.
    const carouselItemContainer: HTMLElement = document.createElement("div");

    // Apply the appropriate class and id.
    carouselItemContainer.classList.add("carousel-item-container");
    carouselItemContainer.id = `carousel-item-container-${this.carouselID}`;

    // Add the carousel items to the carousel item container.
    carouselItems.forEach((carouselItem) => {
      carouselItemContainer.appendChild(carouselItem);
    });

    return carouselItemContainer;
  }

  // Configure the left arrow button.
  private configureCarouselArrow(string: "left" | "right"): HTMLElement {
    // Create the arrow element.
    const arrow: HTMLElement = document.createElement("button");

    // Apply the appropriate class and id.
    arrow.classList.add(`carousel-arrow-${string}`);
    arrow.id = `carousel-arrow-${string}-${this.carouselID}`;

    return arrow;
  }

  // Configure the carousel items.
  private configureCarouselItems(): Element[] {
    // Get all the carousel items.
    const carouselItems = Array.from(
      this.carouselContainer.children[1].children[0].children
    ) as HTMLElement[];

    // Apply the appropriate class and id.
    carouselItems.forEach((carouselItem, index) => {
      carouselItem.classList.add("carousel-item");
      carouselItem.id = `carousel-item-${this.carouselID}-${index}`;
    });

    return carouselItems;
  }

  // Apply styles to all classes.
  private applyStyles(): void {
    this.applyCarouselContainerStyles();
    this.applyCarouselItemContainerWrapperStyles();
    this.applyCarouselItemContainerStyles();
    this.applyCarouselItemStyles();
    this.applyCarouselButtonStyles("left");
    this.applyCarouselButtonStyles("right");
  }

  // Apply styles to the carousel-container class.
  private applyCarouselContainerStyles(): void {
    // Apply the appropriate styles.
    this.carouselContainer.style.width = "fit-content";
    this.carouselContainer.style.margin = "5rem auto";
    this.carouselContainer.style.position = "relative";
  }

  // Apply styles to the carousel-item-container-wrapper class.
  private applyCarouselItemContainerWrapperStyles(): void {
    // Get the carousel item container wrapper.
    const carouselItemContainerWrapper: HTMLElement | null =
      this.carouselContainer.querySelector(
        `.carousel-item-container-wrapper#carousel-item-container-wrapper-${this.carouselID}`
      ) as HTMLElement;

    // Apply the appropriate styles.
    carouselItemContainerWrapper.style.overflow = "hidden";
    carouselItemContainerWrapper.style.margin = `0 ${
      this.carouselButtonWidth + this.carouselItemSpacing
    }px`;
  }

  // Apply styles to the carousel-item-container class.
  private applyCarouselItemContainerStyles(): void {
    // Get the carousel item container.
    const carouselItemContainer: HTMLElement | null =
      this.carouselContainer.querySelector(
        `.carousel-item-container#carousel-item-container-${this.carouselID}`
      ) as HTMLElement;

    // Apply the appropriate styles.
    carouselItemContainer.style.display = "flex";
    carouselItemContainer.style.justifyContent = "center";
    carouselItemContainer.style.gap = `${this.carouselItemSpacing}px`;
    carouselItemContainer.style.width = `${
      this.carouselItemWidth * this.carouselItemsVisible +
      this.carouselItemSpacing * (this.carouselItemsVisible - 1)
    }px`;
    carouselItemContainer.style.transition = "transform 0.5s ease-in-out";
  }

  // Apply styles to the carousel-item class.
  private applyCarouselItemStyles(): void {
    // Should apply the style to all carousel items.
    (this.allCarouselItems as HTMLElement[]).forEach((carouselItem) => {
      carouselItem.style.width = `${this.carouselItemWidth}px`;
      carouselItem.style.height = `${this.carouselItemHeight}px`;
      carouselItem.style.flexShrink = "0";
      carouselItem.style.backgroundColor = "#333";
      carouselItem.style.color = "white";
      carouselItem.style.textAlign = "center";
      carouselItem.style.lineHeight = `${this.carouselItemHeight}px`;
      carouselItem.style.fontSize = "2rem";
    });
  }

  // Apply styles to the carousel button class.
  private applyCarouselButtonStyles(string: "left" | "right"): void {
    // Get the carousel button.
    const carouselButton: HTMLElement | null =
      this.carouselContainer.querySelector(
        `.carousel-arrow-${string}#carousel-arrow-${string}-${this.carouselID}`
      ) as HTMLElement;

    // Apply the appropriate styles.
    carouselButton.style.width = `${this.carouselButtonWidth}px`;
    carouselButton.style.height = `${this.carouselButtonHeight}px`;
    carouselButton.style.position = "absolute";
    carouselButton.style.bottom = "0";

    carouselButton.style.zIndex = "1";
    carouselButton.style.border = "none";
    carouselButton.style.backgroundColor = "#333";
    carouselButton.style.cursor = "pointer";
    carouselButton.style.opacity = "0.2";

    if (string === "left") {
      carouselButton.style.left = "0";
    }
    if (string === "right") {
      carouselButton.style.right = "0";
    }
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
    this.carouselID = ++Carousel.maxID;
    this.carouselContainer = this.configureCarouselContainer(
      options.carouselContainerId
    );

    // Carousel data attributes.
    this.allCarouselItems = this.configureCarouselItems();
    this.allCarouselItemsBottomPtr = 0;
    this.allCarouselItemsTopPtr = this.carouselItemsVisible;
    this.carouselPosition = 0;
    this.isScrolling = false;
    this.prevScrollDirection = "";

    // Apply the appropriate styles to each class.
    this.applyStyles();

    console.log(this.carouselID, this.carouselContainer, this.allCarouselItems);
  }
}
