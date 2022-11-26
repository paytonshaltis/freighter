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
  resizingMethod: "none" | "stretch" | "stretch-gap" | "stretch-scale";
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
  private carouselItemAspectRatio: number;
  private resizingMethod: "none" | "stretch" | "stretch-gap" | "stretch-scale";

  // Carousel DOM element attributes.
  private carouselContainer: HTMLElement;
  private carouselItemContainer: HTMLElement;
  private allCarouselItems: Element[];

  // Carousel data attributes.
  private static maxID: number = -1;
  private carouselID: number;
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
    selectedContainer.appendChild(
      this.configureCarouselItemContainerWrapper(carouselItems)
    );

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

    // Add the transitionend event listener to the carousel item container.
    carouselItemContainer.addEventListener("transitionend", (event) => {
      // Return if a transitionend event is not triggered on the carousel item container.
      if (event.target !== this.carouselItemContainer) {
        return;
      }

      // Get the current length of the carousel item container.
      const carouselItemContainerLength = carouselItemContainer.children.length;

      // Remove the dummy items and non-visible items.
      if (this.prevScrollDirection === "left") {
        for (
          let i = carouselItemContainerLength - 1;
          i > carouselItemContainerLength - 1 - this.carouselScrollBy * 2;
          i--
        ) {
          carouselItemContainer.children[i].remove();
        }

        this.carouselPosition += 1;
        this.transformCarouselItems(false);
      } else if (this.prevScrollDirection === "right") {
        for (let i = 0; i < this.carouselScrollBy * 2; i++) {
          carouselItemContainer.children[0].remove();
        }

        this.carouselPosition -= 1;
        this.transformCarouselItems(false);
      }
      this.isScrolling = false;
    });

    // Add the resize event listener to the adjust the carousel item container's gap.
    if (this.resizingMethod === "stretch-gap") {
      window.addEventListener("resize", this.resizeGap);
    } else if (
      this.resizingMethod === "stretch" ||
      this.resizingMethod == "stretch-scale"
    ) {
      window.addEventListener("resize", this.resizeScale);
    }

    return carouselItemContainer;
  }

  // Configure the left arrow button.
  private configureCarouselArrow(direction: "left" | "right"): HTMLElement {
    // Create the arrow element.
    const arrow: HTMLElement = document.createElement("button");

    // Apply the appropriate class and id.
    arrow.classList.add(`carousel-arrow-${direction}`);
    arrow.id = `carousel-arrow-${direction}-${this.carouselID}`;

    // Add the onclick event listener.
    if (direction === "left") {
      arrow.addEventListener("click", () => {
        if (!this.isScrolling) {
          // Indicate the scrolling direction.
          this.prevScrollDirection = "left";

          // Add appropriate previous items.
          this.allCarouselItemsBottomPtr -= this.carouselScrollBy;
          this.allCarouselItemsTopPtr -= this.carouselScrollBy;
          const prevItems = this.getNCarouselItems(
            this.carouselScrollBy,
            this.allCarouselItemsBottomPtr
          );
          this.carouselItemContainer.prepend(...prevItems);

          // Add two dummy next items.
          const nextItems = this.getNCarouselItems(
            this.carouselScrollBy,
            0,
            false
          );
          nextItems.forEach((item) => {
            item.classList.add("dummy");
          });
          this.carouselItemContainer.append(...nextItems);

          // Moving the carousel to the left.
          this.carouselPosition -= 1;
          this.transformCarouselItems();

          // Allow next button input.
          this.isScrolling = true;
        }
      });
    } else if (direction === "right") {
      arrow.addEventListener("click", () => {
        if (!this.isScrolling) {
          // Indicate the scrolling direction.
          this.prevScrollDirection = "right";

          // Add appropriate next items.
          const nextItems = this.getNCarouselItems(
            this.carouselScrollBy,
            this.allCarouselItemsTopPtr
          );
          this.carouselItemContainer.append(...nextItems);
          this.allCarouselItemsBottomPtr += this.carouselScrollBy;
          this.allCarouselItemsTopPtr += this.carouselScrollBy;

          // Add two dummy previous items.
          const prevItems = this.getNCarouselItems(
            this.carouselScrollBy,
            0,
            false
          );
          prevItems.forEach((item) => {
            item.classList.add("dummy");
          });
          this.carouselItemContainer.prepend(...prevItems);

          // Moving the carousel to the right.
          this.carouselPosition += 1;
          this.transformCarouselItems();

          // Allow next button input.
          this.isScrolling = true;
        }
      });
    }

    return arrow;
  }

  // Configure the carousel items.
  private configureCarouselItems(): Element[] {
    // Get all the carousel items.
    const carouselItems = Array.from(
      this.carouselItemContainer.children
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
    this.carouselContainer.style.width =
      this.resizingMethod === "none" ? "fit-content" : "100%";
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
    if (this.resizingMethod === "none") {
      carouselItemContainer.style.width = `${
        this.carouselItemWidth * this.carouselItemsVisible +
        this.carouselItemSpacing * (this.carouselItemsVisible - 1)
      }px`;
    } else {
      carouselItemContainer.style.width = "100%";
    }
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

  private resizeGap = () => {
    const computedGap =
      (parseFloat(getComputedStyle(this.carouselItemContainer).width) -
        this.carouselItemWidth * this.carouselItemsVisible) /
      (this.carouselItemsVisible + 1);
    this.carouselItemContainer.style.gap =
      computedGap > this.carouselItemSpacing
        ? computedGap + "px"
        : this.carouselItemSpacing + "px";
  };

  private resizeScale = () => {
    // Allow each active carousel item to shrink or grow as needed.
    for (let i = 0; i < this.carouselItemContainer.children.length; i++) {
      (this.carouselItemContainer.children[i] as HTMLElement).style.flexGrow =
        "1";
      (this.carouselItemContainer.children[i] as HTMLElement).style.flexShrink =
        "1";
    }

    // Get the newly computed width of the carouse items.
    setTimeout(() => {
      this.carouselItemWidth = parseFloat(
        getComputedStyle(this.carouselItemContainer.children[0] as HTMLElement)
          .width
      );
      console.log(
        getComputedStyle(this.carouselItemContainer.children[0] as HTMLElement)
          .width
      );

      const computedHeight =
        this.resizingMethod === "stretch-scale"
          ? this.carouselItemAspectRatio * this.carouselItemWidth
          : this.carouselItemHeight;

      // Set the width of the active carousel items to the newly computed width.
      for (let i = 0; i < this.carouselItemContainer.children.length; i++) {
        (this.carouselItemContainer.children[i] as HTMLElement).style.width =
          this.carouselItemWidth + "px";
        (this.carouselItemContainer.children[i] as HTMLElement).style.height =
          computedHeight + "px";
        (this.carouselItemContainer.children[i] as HTMLElement).style.flexGrow =
          "0";
        (
          this.carouselItemContainer.children[i] as HTMLElement
        ).style.flexShrink = "0";
      }

      // Set the width of all carousel items to the newly computed width.
      (this.allCarouselItems as HTMLElement[]).forEach((carouselItem) => {
        carouselItem.style.width = `${this.carouselItemWidth}px`;
        carouselItem.style.height = `${computedHeight}px`;
        carouselItem.style.flexGrow = "0";
        carouselItem.style.flexShrink = "0";
      });
    }, 0);

    console.log("all items:", this.allCarouselItems);
  };

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
    this.resizingMethod = options.resizingMethod;
    this.carouselItemAspectRatio =
      this.carouselItemHeight / this.carouselItemWidth;

    // Carousel DOM element attributes.
    this.carouselID = ++Carousel.maxID;
    this.carouselContainer = this.configureCarouselContainer(
      options.carouselContainerId
    );
    this.carouselItemContainer = this.carouselContainer.children[0]
      .children[0] as HTMLElement;
    this.allCarouselItems = this.configureCarouselItems();
    this.carouselContainer.prepend(this.configureCarouselArrow("left"));
    this.carouselContainer.appendChild(this.configureCarouselArrow("right"));

    // Carousel data attributes.
    this.allCarouselItemsBottomPtr = 0;
    this.allCarouselItemsTopPtr = this.carouselItemsVisible;
    this.carouselPosition = 0;
    this.isScrolling = false;
    this.prevScrollDirection = "";

    // Apply the appropriate styles to each class.
    this.applyStyles();

    // Initialize the order of the carousel items.
    this.initializeCarousel();

    // Adjust the initial gap between carousel items.
    if (this.resizingMethod === "stretch-gap") {
      this.resizeGap();
    } else if (
      this.resizingMethod === "stretch" ||
      this.resizingMethod == "stretch-scale"
    ) {
      this.resizeScale();
    }
  }

  /**
   * Returns n carousel items from the starting index provided.
   * Will loop around to the other end if necessary.
   * @param n The number of carousel items to be returned.
   * @param start The index to start getting items from.
   * @param deep Optional parameter. If true, the entire node will be returned.
   * If false, only the outer element will be returned.
   * @returns An array of carousel items.
   */
  private getNCarouselItems = (
    n: number,
    start: number,
    deep: boolean = true
  ) => {
    const carouselItemsLength = this.allCarouselItems.length;
    const result: HTMLElement[] = [];

    // If the starting index is negative, wrap around to the other end.
    while (start < 0) {
      start = carouselItemsLength + start;
    }

    // Start at the start index and get n items.
    for (let i = start; i < start + n; i++) {
      result.push(
        this.allCarouselItems[i % carouselItemsLength]?.cloneNode(
          deep
        ) as HTMLElement
      );
    }
    return result;
  };

  // Reorder the elements in the carousel item container.
  private initializeCarousel = () => {
    // The list of active carousel items.
    const activeCarouselItems: Element[] = [];

    // Fills the active carousel items list with the first
    // carouselItemsVisible items. May need to wrap around.
    for (let i = 0; i < this.carouselItemsVisible; i++) {
      const element = this.allCarouselItems[i % this.allCarouselItems.length];
      if (i < this.carouselItemsVisible && element) {
        activeCarouselItems.push((element as Node).cloneNode(true) as Element);
      }
    }

    // Replace the carousel items with the active carousel items.
    this.carouselItemContainer.replaceChildren(...activeCarouselItems);
  };

  // Transform the carousel items based on the position array.
  private transformCarouselItems = (animate = true) => {
    if (!animate) {
      this.carouselItemContainer.style.transition = "none";
    }

    const spacingAmount =
      this.resizingMethod === "stretch-gap"
        ? parseFloat(getComputedStyle(this.carouselItemContainer).gap)
        : this.carouselItemSpacing;

    this.carouselItemContainer.style.transform = `translateX(${
      -1 *
      this.carouselPosition *
      ((this.carouselItemWidth + spacingAmount) * this.carouselScrollBy)
    }px)`;

    if (!animate) {
      setTimeout(() => {
        this.carouselItemContainer.style.transition =
          "transform 0.5s ease-in-out";
      }, 0);
    }
  };
}
