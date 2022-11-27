import CarouselOptions, {
  convertCarouselOptions,
  validateCarouselOptions,
} from "./types/CarouselOptions.type.js";

/**
 * Class representing a single carousel.
 */
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
  private carouselTransition: string;
  private resizingMethod: "none" | "stretch" | "stretch-gap" | "stretch-scale";

  // Carousel DOM element attributes.
  private carouselContainer: HTMLElement;
  private carouselItemContainer: HTMLElement;
  private allCarouselItems: HTMLElement[];

  // Carousel data attributes.
  private static maxID: number = -1;
  private carouselID: number;
  private allCarouselItemsTopPtr: number;
  private allCarouselItemsBottomPtr: number;
  private carouselPosition: number;
  private isScrolling: boolean;
  private prevScrollDirection: string;
  private carouselContainerConfigured = false;
  private carouselItemsConfigured = false;
  private usingBezierTransition: boolean;

  /**
   * Configures the main carousel container. Constructs the carousel from the
   * the provided ID for the target div, passing along the carousel items for
   * later processing.
   * @param {string} carouselContainerId The ID of the target div. The carousel will be
   * constructed, and elements will be added to the target div. The only elements
   * that should be in the target div are the items that wish to be inserted into
   * the carousel as carousel items.
   * @returns {HTMLElement} A reference to the carousel container.
   */
  private configureCarouselContainer(carouselContainerId: string): HTMLElement {
    // Throw an error if the carousel container does not exist.
    const selectedContainer: HTMLElement | null =
      document.getElementById(carouselContainerId);
    if (!selectedContainer) {
      throw new Error("Carousel container not found.");
    }

    // Store the children of the carousel container, removing them from the
    // target div for processing later on.
    const carouselItems = Array.from(
      selectedContainer.children
    ) as HTMLElement[];
    selectedContainer.innerHTML = "";

    // Apply the appropriate class. The div's own ID and any other classes
    // remain and won't be overwritten.
    selectedContainer.classList.add("carousel-container");

    // Append the carousel item container wrapper to the carousel container.
    // Pass the carousel items to the carousel item container wrapper config.
    selectedContainer.appendChild(
      this.configureCarouselItemContainerWrapper(carouselItems)
    );

    // Return a reference to the generated carousel container, and indicate that
    // the carousel container has been configured.
    this.carouselContainerConfigured = true;
    return selectedContainer;
  }

  /**
   * Configures the carousel item container wrapper. Constructs the carousel item
   * container wrapper, passing along the carousel items for later processing.
   * @param {HTMLElement[]} carouselItems The carousel items to be inserted into the
   * carousel item container after they are processed.
   * @returns {HTMLElement} A reference to the carousel item container wrapper.
   */
  private configureCarouselItemContainerWrapper(
    carouselItems: HTMLElement[]
  ): HTMLElement {
    // Create the carousel item container wrapper.
    const carouselItemContainerWrapper: HTMLElement =
      document.createElement("div");

    // Apply the appropriate class and ID based on the carousel ID.
    carouselItemContainerWrapper.classList.add(
      "carousel-item-container-wrapper"
    );
    carouselItemContainerWrapper.id = `carousel-item-container-wrapper-${this.carouselID}`;

    // Add the carousel item container to the carousel item container wrapper.
    // Pass the carousel items to the carousel item container config.
    carouselItemContainerWrapper.appendChild(
      this.configureCarouselItemContainer(carouselItems)
    );

    // Return a reference to the generated carousel item container wrapper.
    return carouselItemContainerWrapper;
  }

  /**
   * Configures the carousel item container. Constructs the carousel item
   * container, and finally appending the carousel items for later processing.
   * @param {HTMLElement[]} carouselItems The carousel items to be inserted into the
   * carousel item container for later processing.
   * @returns {HTMLElement} A reference to the carousel item container.
   */
  private configureCarouselItemContainer(
    carouselItems: HTMLElement[]
  ): HTMLElement {
    // Create the carousel item container.
    const carouselItemContainer: HTMLElement = document.createElement("div");

    // Apply the appropriate class and id based on the carousel ID.
    carouselItemContainer.classList.add("carousel-item-container");
    carouselItemContainer.id = `carousel-item-container-${this.carouselID}`;

    // Add the carousel items to the carousel item container. They are added in the
    // same order, and will be processed later.
    carouselItems.forEach((carouselItem) => {
      carouselItemContainer.appendChild(carouselItem);
    });

    // Add the transitionend event listener to the carousel item container. This
    // event listener will be used to determine when the carousel has finished
    // scrolling, which allows for the carousel items that are no longer visible
    // to be removed from the DOM safely.
    carouselItemContainer.addEventListener("transitionend", (event) => {
      // Return if the transitionend event is not for the carousel item container,
      // but is instead fired for one of the carousel items.
      if (event.target !== this.carouselItemContainer) {
        return;
      }

      // Get the current length of the carousel item container.
      const carouselItemContainerLength = carouselItemContainer.children.length;

      // If the previous scroll was left, remove items from the right
      // side of the carousel item container: this totals
      // (this.carouselScrollBy * 2) since dummy items need to be accounted for.
      if (this.prevScrollDirection === "left") {
        for (
          let i = carouselItemContainerLength - 1;
          i > carouselItemContainerLength - 1 - this.carouselScrollBy * 2;
          i--
        ) {
          carouselItemContainer.children[i].remove();
        }

        // Update the current position of the carousel and transform it.
        // back to its correct location after the items are removed. Calls
        // transformCarouselItemContainer() with false to prevent the
        // transition from occurring.
        this.carouselPosition += 1;
        this.transformCarouselItems(false);
      }

      // If the previous scroll was right, remove items from the left
      // side of the carousel item container: this totals
      // (this.carouselScrollBy * 2) since dummy items need to be accounted for.
      else if (this.prevScrollDirection === "right") {
        for (let i = 0; i < this.carouselScrollBy * 2; i++) {
          carouselItemContainer.children[0].remove();
        }

        // Update the current position of the carousel and transform it.
        // back to its correct location after the items are removed. Calls
        // transformCarouselItemContainer() with false to prevent the
        // transition from occurring.
        this.carouselPosition -= 1;
        this.transformCarouselItems(false);
      }

      // If the size changed while the carousel was scrolling, the carousel
      // item container will need to be resized.
      this.resizeCarousel();

      // Allow the carousel to be scrolled again.
      this.isScrolling = false;
    });

    // Return a reference to the generated carousel item container.
    return carouselItemContainer;
  }

  /**
   * Congigures the carousel controls. Constructs one of the two carousel
   * control buttons and returns a reference to it.
   * @param {string} direction The direction of the carousel control button.
   * @returns {HTMLElement} A reference to the carousel control button.
   */
  private configureCarouselButton(direction: "left" | "right"): HTMLElement {
    // Create the button element.
    const button: HTMLElement = document.createElement("button");

    // Apply the appropriate class and id based on the carousel ID.
    button.classList.add(`carousel-arrow-${direction}`);
    button.id = `carousel-arrow-${direction}-${this.carouselID}`;

    // Add the event listener for scrolling to the left.
    if (direction === "left") {
      button.addEventListener("click", () => {
        if (!this.isScrolling) {
          // Indicate the scrolling direction.
          this.prevScrollDirection = "left";

          // Add the appropriate number of carousel items to the left side of the
          // carousel item container. These should be actual carousel items, not
          // dummy items.
          this.allCarouselItemsBottomPtr -= this.carouselScrollBy;
          this.allCarouselItemsTopPtr -= this.carouselScrollBy;
          const prevItems = this.getCarouselItems(
            this.carouselScrollBy,
            this.allCarouselItemsBottomPtr
          );
          this.carouselItemContainer.prepend(...prevItems);

          // Add the matching number of dummy items to the right side.
          const nextItems = this.getCarouselItems(
            this.carouselScrollBy,
            this.usingBezierTransition
              ? this.allCarouselItemsTopPtr + this.carouselScrollBy
              : 0,
            this.usingBezierTransition
          );
          nextItems.forEach((item) => {
            item.classList.add("dummy");
          });
          this.carouselItemContainer.append(...nextItems);

          // Adjust the carousel's position, and transform it with animation.
          this.carouselPosition -= 1;
          this.transformCarouselItems();

          // Allow the next scrolling input.
          this.isScrolling = true;
        }
      });
    }

    // Add the event listener for scrolling to the right.
    else if (direction === "right") {
      button.addEventListener("click", () => {
        if (!this.isScrolling) {
          // Indicate the scrolling direction.
          this.prevScrollDirection = "right";

          // Add the appropriate number of carousel items to the right side of the
          // carousel item container. These should be actual carousel items, not
          // dummy items.
          const nextItems = this.getCarouselItems(
            this.carouselScrollBy,
            this.allCarouselItemsTopPtr
          );
          this.carouselItemContainer.append(...nextItems);
          this.allCarouselItemsBottomPtr += this.carouselScrollBy;
          this.allCarouselItemsTopPtr += this.carouselScrollBy;

          // Add the matching number of dummy items to the left side.
          const prevItems = this.getCarouselItems(
            this.carouselScrollBy,
            this.usingBezierTransition
              ? this.allCarouselItemsBottomPtr - this.carouselScrollBy * 2
              : 0,
            this.usingBezierTransition
          );
          prevItems.forEach((item) => {
            item.classList.add("dummy");
          });
          this.carouselItemContainer.prepend(...prevItems);

          // Adjust the carousel's position, and transform it with animation.
          this.carouselPosition += 1;
          this.transformCarouselItems();

          // Allow the next scrolling input.
          this.isScrolling = true;
        }
      });
    }

    // Return a reference to the generated carousel control button.
    return button;
  }

  /**
   * Configures the carousel buttons. Note that as a prerequisite, the carousel
   * container must have been congifured with the configureCarouselContainer()
   * method. This ensures that the carousel items have been passed down to the
   * carousel item container.
   * @returns {HTMLElement[]} An array of all carousel items.
   */
  private configureCarouselItems(): HTMLElement[] {
    // Make sure that the carousel container has been configured.
    if (!this.carouselContainerConfigured) {
      throw new Error(
        `The carousel container must be configured before the carousel items can 
        be configured. This is likely an error with the order in which methods are 
        being called in the constructor.`
      );
    }

    // Get all the carousel items from the carousel item container.
    const carouselItems = Array.from(
      this.carouselItemContainer.children
    ) as HTMLElement[];

    // Apply the appropriate class and id to each carousel item.
    carouselItems.forEach((carouselItem, index) => {
      carouselItem.classList.add("carousel-item");
      carouselItem.id = `carousel-item-${this.carouselID}-${index}`;
    });

    // Return the array of carousel items, and indicate that the carousel
    // container has been configured.
    this.carouselItemsConfigured = true;
    return carouselItems;
  }

  /**
   * Applies the styles to each of the carousel-related elements based on the
   * classes that have been added. Should be called after all the elements have
   * been configured.
   * @returns {void} Nothing.
   */
  private applyStyles(): void {
    // Make sure that the carousel container and items have been configured.
    if (!this.carouselContainerConfigured || !this.carouselItemsConfigured) {
      throw new Error(
        `The carousel container and items must be configured before the styles
        can be applied. This is likely an error with the order in which methods are
        being called in the constructor.`
      );
    }

    // Call each of the style application methods. Note that the buttons are
    // applied last, as their order changes the selection of the carousel items.
    this.applyCarouselContainerStyles();
    this.applyCarouselItemContainerWrapperStyles();
    this.applyCarouselItemContainerStyles();
    this.applyCarouselItemStyles();
    this.applyCarouselButtonStyles("left");
    this.applyCarouselButtonStyles("right");
  }

  /**
   * Applies the styles to the carousel container.
   * @returns {void} Nothing.
   */
  private applyCarouselContainerStyles(): void {
    // The width of the main container is dependend on the resize mode.
    this.carouselContainer.style.width =
      this.resizingMethod === "none" ? "fit-content" : "100%";

    // The position should be relative to allow for the absolute positioning of
    // the carousel control buttons.
    this.carouselContainer.style.position = "relative";
  }

  /**
   * Applies the styles to the carousel item container wrapper.
   * @returns {void} Nothing.
   */
  private applyCarouselItemContainerWrapperStyles(): void {
    // Get the carousel item container wrapper from the carousel container.
    const carouselItemContainerWrapper: HTMLElement | null =
      this.carouselContainer.querySelector(
        `.carousel-item-container-wrapper#carousel-item-container-wrapper-${this.carouselID}`
      ) as HTMLElement;

    // Hide the overflow so that next and dummy items are not visible.
    carouselItemContainerWrapper.style.overflow = "hidden";
  }

  /**
   * Applies the styles to the carousel item container.
   * @returns {void} Nothing.
   */
  private applyCarouselItemContainerStyles(): void {
    // Get the carousel item container from the carousel container.
    const carouselItemContainer: HTMLElement | null =
      this.carouselContainer.querySelector(
        `.carousel-item-container#carousel-item-container-${this.carouselID}`
      ) as HTMLElement;

    // Display flex to appropriately space out the carousel items.
    carouselItemContainer.style.display = "flex";
    carouselItemContainer.style.justifyContent = "center";
    carouselItemContainer.style.gap = `${this.carouselItemSpacing}px`;

    // The width is dependend on the resize mode.
    if (this.resizingMethod === "none") {
      carouselItemContainer.style.width = `${
        this.carouselItemWidth * this.carouselItemsVisible +
        this.carouselItemSpacing * (this.carouselItemsVisible - 1)
      }px`;
    } else {
      carouselItemContainer.style.width = "100%";
    }

    // A transition must be applied in order to trigger transitionend events.
    carouselItemContainer.style.transition = this.carouselTransition;
  }

  /**
   * Applies the styles to the carousel items.
   * @returns {void} Nothing.
   */
  private applyCarouselItemStyles(): void {
    // Need to loop through all the carousel items.
    this.allCarouselItems.forEach((carouselItem) => {
      // Set the width and height of the carousel items based on the constructor.
      carouselItem.style.width = `${this.carouselItemWidth}px`;
      carouselItem.style.height = `${this.carouselItemHeight}px`;

      // The carousel items should by default not be allowed to shrink.
      carouselItem.style.flexShrink = "0";

      // TODO: Apply other styles based on the constructor.
      carouselItem.style.backgroundColor = "#333";
      carouselItem.style.color = "white";
      carouselItem.style.textAlign = "center";
      carouselItem.style.lineHeight = `${this.carouselItemHeight}px`;
      carouselItem.style.fontSize = "2rem";
    });
  }

  /**
   * Applies the styles to one of the carousel buttons, as indicated by direction.
   * @param {string} direction The direction of the carousel button. Either "left"
   * or "right".
   */
  private applyCarouselButtonStyles(direction: "left" | "right"): void {
    // Get the carousel button from the carousel container.
    const carouselButton: HTMLElement | null =
      this.carouselContainer.querySelector(
        `.carousel-arrow-${direction}#carousel-arrow-${direction}-${this.carouselID}`
      ) as HTMLElement;

    // Set the width and height of the carousel button based on the constructor.
    carouselButton.style.width = `${this.carouselButtonWidth}px`;
    carouselButton.style.height = `${this.carouselButtonHeight}px`;

    // Other required styles.
    carouselButton.style.cursor = "pointer";
    carouselButton.style.zIndex = "1";

    // TODO: Apply other styles based on the constructor.
    carouselButton.style.border = "none";
    carouselButton.style.backgroundColor = "#CCC";
    carouselButton.style.opacity = "0.5";

    // Need to absolutely position the carousel button.
    carouselButton.style.position = "absolute";
    carouselButton.style.bottom = "50%";
    carouselButton.style.transform = "translateY(50%)";
    if (direction === "left") {
      carouselButton.style.left = "0";
    }
    if (direction === "right") {
      carouselButton.style.right = "0";
    }
  }

  /**
   * Event listener for resizing the carousel for the 'stretch-gap' resizing
   * method. Each gap between carousel items is stretched to fill the available
   * space created by a resize, but items are not resized. If the new gap size
   * is less than the minimum gap size, the minimum gap size is used instead.
   * @returns {void} Nothing.
   */
  private resizeGap(): void {
    // Compute the expected gap size based on the newly sized carousel item
    //container.
    const computedGap =
      (parseFloat(
        getComputedStyle(this.carouselItemContainer as Element).width
      ) -
        this.carouselItemWidth * this.carouselItemsVisible) /
      (this.carouselItemsVisible + 1);

    // Set the gap size to the larger of the computed gap and the minimum gap
    // size provided by the constructor.
    this.carouselItemContainer.style.gap =
      computedGap > this.carouselItemSpacing
        ? computedGap + "px"
        : this.carouselItemSpacing + "px";
  }

  /**
   * Event listener for resizing the carousel for the 'stretch' and 'stretch-scale'
   * resizing methods. Each carousel item is resized to fill the available space
   * created by a resize, but the gap between carousel items is not resized. If
   * the resize method is 'stretch-scale', the carousel items preserve their aspect ratio.
   * @returns {void} Nothing.
   */
  private resizeScale(): void {
    // Set each item to shrink and grow in the flexbox. This does the resizing
    // calculations for us.
    for (
      let i = 0;
      i < (this.carouselItemContainer as Element).children.length;
      i++
    ) {
      (this.carouselItemContainer.children[i] as HTMLElement).style.flexGrow =
        "1";
      (this.carouselItemContainer.children[i] as HTMLElement).style.flexShrink =
        "1";
    }

    // Sets a 0 second timeout to allow the browser to finish the resizing above.
    setTimeout(() => {
      // Get the new width of each carousel item containers after flex shrinking
      // or flex growing.
      this.carouselItemWidth = parseFloat(
        getComputedStyle(this.carouselItemContainer.children[0] as HTMLElement)
          .width
      );

      // If the resize method is 'stretch-scale', the carousel items preserve
      // their aspect ratio. Otherwise, the height remains the same.
      const computedHeight =
        this.resizingMethod === "stretch-scale"
          ? this.carouselItemAspectRatio * this.carouselItemWidth
          : this.carouselItemHeight;

      // Set the new width and height of each active carousel item, and remove the flex
      // grow and shrink properties. This prevents the carousel items from
      // resizing again when next and dummy items are added.
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

      // Set the new width and height of all the carousel items, not just the
      // active ones. This is neccessary for items to be added as next and dummy
      // items as the appropriate sizes.
      this.allCarouselItems.forEach((carouselItem) => {
        carouselItem.style.width = `${this.carouselItemWidth}px`;
        carouselItem.style.height = `${computedHeight}px`;
        carouselItem.style.flexGrow = "0";
        carouselItem.style.flexShrink = "0";
      });
    }, 0);
  }

  /**
   * Single parameter constructor. Accepts a CarouselOptions object. with desired
   * carousel options. The constructor initializes all class attributes, configures
   * all elements within the carousel container, styles the elements, and initializes
   * the carousel with the correct starting elements based on the carousel options.
   * @param {CarouselOptions} options The options for the carousel.
   * @returns {Carousel} A new Carousel object.
   */
  constructor(options: CarouselOptions) {
    // Validate and convert the options object.
    validateCarouselOptions(options);
    convertCarouselOptions(options);

    // Initialize all class attributes.
    this.carouselItemWidth = options.carouselItemWidth;
    this.carouselItemHeight = options.carouselItemHeight;
    this.carouselItemSpacing = options.carouselItemSpacing;
    this.carouselButtonWidth = options.carouselButtonWidth;
    this.carouselButtonHeight = options.carouselButtonHeight;
    this.carouselItemsVisible = options.carouselItemsVisible;
    this.carouselScrollBy = options.carouselScrollBy;
    this.resizingMethod = options.resizingMethod;
    this.carouselTransition = `transform ${
      options.carouselTransitionDuration || 500
    }ms ${options.carouselTransitionTimingFunction || "ease-in-out"} ${
      options.carouselTransitionDelay || 0
    }ms`;
    this.carouselItemAspectRatio =
      this.carouselItemHeight / this.carouselItemWidth;

    // Give the carousel a unique internal ID.
    this.carouselID = ++Carousel.maxID;

    // Configure the main carousel container, carousel item container, and
    // carousel item container.
    this.carouselContainer = this.configureCarouselContainer(
      options.carouselContainerId
    );
    this.carouselItemContainer = this.carouselContainer.children[0]
      .children[0] as HTMLElement;
    this.allCarouselItems = this.configureCarouselItems();

    // Configure and add the carousel buttons.
    this.carouselContainer.prepend(this.configureCarouselButton("left"));
    this.carouselContainer.appendChild(this.configureCarouselButton("right"));

    // Initialize the carousel with the correct starting data.
    this.allCarouselItemsBottomPtr = 0;
    this.allCarouselItemsTopPtr = this.carouselItemsVisible;
    this.carouselPosition = 0;
    this.isScrolling = false;
    this.prevScrollDirection = "";
    this.usingBezierTransition = options.carouselTransitionTimingFunction
      ? options.carouselTransitionTimingFunction.startsWith("cubic-bezier")
      : false;

    // Apply the appropriate styles to each class.
    this.applyStyles();

    // Initialize the order of the carousel items.
    this.initializeCarousel();

    // Adjust the initial size of the carousel items based on the resizing method.
    this.resizeCarousel();

    // Add the correct event listeners to the window for resizing the carousel based
    // on the resizing method.
    if (this.resizingMethod === "stretch-gap") {
      new ResizeObserver(() => {
        if (!this.isScrolling) this.resizeGap();
      }).observe(this.carouselContainer.parentElement as HTMLElement);
    } else if (
      this.resizingMethod === "stretch" ||
      this.resizingMethod == "stretch-scale"
    ) {
      new ResizeObserver(() => {
        if (!this.isScrolling) this.resizeScale();
      }).observe(this.carouselContainer.parentElement as HTMLElement);
    }
  }

  /**
   * Returns carousel items from the starting index provided from this.allCarouselItems.
   * Will loop around to the beginning of this.allCarouselItems if the starting index
   * provided is greater than or less than the length of this.allCarouselItems, or if
   * the index progresses past the end of this.allCarouselItems.
   * @param {number} numItems The number of carousel items to be returned.
   * @param {number} start The index to start getting items from.
   * @param {boolean} deep Optional parameter. If true, the entire node will be returned via a
   * deep copy. Otherwise, only the carousel item outermost element will be returned.
   * This is used for quickly generating dummy items.
   * @returns {HTMLElement[]} An array of carousel items.
   */
  private getCarouselItems(
    numItems: number,
    start: number,
    deep: boolean = true
  ): HTMLElement[] {
    const carouselItemsLength = this.allCarouselItems.length;
    const result: HTMLElement[] = [];

    // If the starting index is negative, wrap around to the other end.
    while (start < 0) {
      start = carouselItemsLength + start;
    }

    // Start at the start index and get n items, wrapping anytime the index
    // progresses past the end of this.allCarouselItems (using modulo).
    for (let i = start; i < start + numItems; i++) {
      result.push(
        this.allCarouselItems[i % carouselItemsLength]?.cloneNode(
          deep
        ) as HTMLElement
      );
    }

    // Return the array of retrieved carousel items.
    return result;
  }

  /**
   * Reorders the carousel items for the starting position. This means doing
   * one of two things:
   * 1. If there are fewer carousel items than the number of carousel items visible,
   * then the carousel items are duplicated until there are enough carousel items
   * to fill the carousel.
   * 2. If there are at least enough carousel items to fill the entire carousel, only
   * this.carouselItemsVisible carousel items are shown.
   * @returns {void} Nothing.
   */
  private initializeCarousel(): void {
    // The list of active carousel items. This will have size this.carouselItemsVisible.
    const activeCarouselItems: Element[] = [];

    // Fills the active carousel items list with the first this.carouselItemsVisible
    // items. May need to wrap around.
    for (let i = 0; i < this.carouselItemsVisible; i++) {
      const element = this.allCarouselItems[i % this.allCarouselItems.length];
      if (i < this.carouselItemsVisible && element) {
        activeCarouselItems.push((element as Node).cloneNode(true) as Element);
      }
    }

    // Replace the carousel items with the active carousel items. This ensures
    // that the only rendered items in the carousel are those being shown.
    this.carouselItemContainer.replaceChildren(...activeCarouselItems);
  }

  /**
   * Transform the carousel items to the correct position based on the current
   * carousel position.
   * @param {boolean} animate Optional parameter. If true, the carousel items will
   * be animated to the correct position. Otherwise, the carousel items will be
   * immediately transformed to the correct position. Only explicitly call this
   * function with animate = false if it is to reposition the carousel items
   * after a transition has ended.
   * @returns {void} Nothing.
   */
  private transformCarouselItems(animate: boolean = true): void {
    // If the transform should not be animated, remove the transition property.
    if (!animate) {
      this.carouselItemContainer.style.transition = "none";
    }

    // Determine the amount of space currently between each carousel item. This
    // will have been changed if the resize method is "stretch-gap".
    const spacingAmount =
      this.resizingMethod === "stretch-gap"
        ? parseFloat(getComputedStyle(this.carouselItemContainer).gap)
        : this.carouselItemSpacing;

    // Apply the transformation the correct distance.
    this.carouselItemContainer.style.transform = `translateX(${
      -1 *
      this.carouselPosition *
      ((this.carouselItemWidth + spacingAmount) * this.carouselScrollBy)
    }px)`;

    // If the transform was not animated, add the transition property back. This
    // is done in a timeout to ensure that the transform is applied before the
    // transition is added back.
    if (!animate) {
      setTimeout(() => {
        this.carouselItemContainer.style.transition = this.carouselTransition;
      }, 0);
    }
  }

  /**
   * Adjusts the size of the carousel items based on the resizing method.
   * @returns {void} Nothing.
   */
  private resizeCarousel(): void {
    if (this.resizingMethod === "stretch-gap") {
      this.resizeGap();
    } else if (
      this.resizingMethod === "stretch" ||
      this.resizingMethod == "stretch-scale"
    ) {
      this.resizeScale();
    }
  }
}
