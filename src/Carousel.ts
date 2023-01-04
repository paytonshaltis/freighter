import ButtonStyle from "./types/ButtonStyle.type.js";
import CarouselOptions from "./types/CarouselOptions.type.js";
import CarouselState from "./types/CarouselState.type.js";

/**
 * Class representing a single carousel.
 */
export default class Carousel {
  // Options directly passed in from the constructor.
  private carouselID: number;
  private itemWidth: number;
  private itemHeight: number;
  private itemSpacing: number;
  private numItemsVisible: number;
  private scrollBy: number;
  private itemAspectRatio: number;
  private transitionDuration: number;
  private transitionDelay: number;
  private transitionTimingFunction: string;
  private transition: string;
  private scrollable: boolean;
  private autoScroll: boolean;
  private autoScrollInterval: number;
  private autoScrollDirection: "left" | "right" | undefined;
  private autoScrollPauseOnHover: boolean;
  private syncScrollWithVisibility: boolean;
  private resizingMethod: "none" | "stretch" | "stretch-gap" | "stretch-scale";
  private wrappingMethod: "none" | "wrap-simple" | "wrap-smart";
  private buttonStyles: ButtonStyle;
  private buttonHoverStyles: ButtonStyle;
  private leftButtonStyles: ButtonStyle;
  private leftButtonHoverStyles: ButtonStyle;
  private rightButtonStyles: ButtonStyle;
  private rightButtonHoverStyles: ButtonStyle;

  // Carousel internal DOM element attributes.
  private carouselContainer: HTMLElement;
  private carouselItemContainer: HTMLElement;
  private allItems: HTMLElement[];

  // Carousel internal data attributes.
  private static maxID: number = -1;
  private rightCarouselPointer: number;
  private leftCarouselPointer: number;
  private isScrolling: boolean;
  private canScrollLeft: boolean;
  private canScrollRight: boolean;
  private prevScroll: string;
  private carouselContainerConfigured = false;
  private carouselItemsConfigured = false;
  private usingBezierTransition: boolean;
  private currentScrollBy: number;
  private isHovering: boolean = false;

  // Maintain some original state for the carousel.
  private originalItemHeight: number;
  private originalItemWidth: number;
  private originalScrollBy: number;

  // Event listeners, resize observer, and timeouts.
  private transitionEndEventListener: EventListener = (event: Event) => {};
  private leftButtonClickListener: EventListener = (event: Event) => {};
  private rightButtonClickListener: EventListener = (event: Event) => {};
  private leftButtonMouseEnterListener = (event: Event): void => {};
  private leftButtonMouseLeaveListener = (event: Event): void => {};
  private rightButtonMouseEnterListener = (event: Event): void => {};
  private rightButtonMouseLeaveListener = (event: Event): void => {};
  private containerMouseEnterListener: EventListener = (event: Event) => {
    this.isHovering = true;
    clearTimeout(this.autoScrollTimeout);
  };
  private containerMouseLeaveListener: EventListener = (event: Event) => {
    this.isHovering = false;
    if (this.autoScroll) {
      this.startAutoScrollTimeout();
    }
  };
  private parentResizeObserver: ResizeObserver = new ResizeObserver(() => {});
  private autoScrollTimeout: number = -1;

  /**
   * Configures the main carousel container. Constructs the carousel from the
   * the provided ID for the target div, passing along the carousel items for
   * later processing.
   * @param {string} carouselContainerId The ID of the target div. The carousel will be
   * constructed, and elements will be appended to the target div. The only elements
   * that should be in the target div are the items that wish to be inserted into
   * the carousel as carousel items.
   * @param {HTMLElement[]} carouselItemsFromState Optional parameter, the
   * carousel items from the previous state that should be used rather than the
   * children of the target container div.
   * @returns {HTMLElement} A reference to the carousel container.
   */
  private configureCarouselContainer(
    carouselContainerId: string,
    carouselItemsFromState?: HTMLElement[]
  ): HTMLElement {
    // Throw an error if the carousel container does not exist.
    const selectedContainer: HTMLElement | null =
      document.getElementById(carouselContainerId);
    if (!selectedContainer) {
      throw new Error(
        `Carousel container with ID ${carouselContainerId} not found.`
      );
    }

    // Temporarily store the carousel items and clear the container.
    const carouselItems = carouselItemsFromState
      ? carouselItemsFromState
      : (Array.from(selectedContainer.children) as HTMLElement[]);
    selectedContainer.innerHTML = "";

    // Create the carousel container and append it to the target div.
    const carouselContainer: HTMLElement = document.createElement("div");
    carouselContainer.id = `freighter-carousel-container-${this.carouselID}`;
    selectedContainer.appendChild(carouselContainer);

    // Apply the appropriate class to the carousel container.
    carouselContainer.classList.add("freighter-carousel-container");

    // Add the mouse enter and leave listeners to the carousel container.
    if (this.autoScrollPauseOnHover) {
      carouselContainer.addEventListener(
        "mouseenter",
        this.containerMouseEnterListener
      );
      carouselContainer.addEventListener(
        "mouseleave",
        this.containerMouseLeaveListener
      );
    }

    // Append the carousel item container wrapper to the carousel container.
    // Pass the carousel items to the carousel item container wrapper config.
    carouselContainer.appendChild(
      this.configureCarouselItemContainerWrapper(carouselItems)
    );

    // Return a reference to the generated carousel container, and indicate that
    // the carousel container has been configured.
    this.carouselContainerConfigured = true;
    return carouselContainer;
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
      "freighter-carousel-item-container-wrapper"
    );
    carouselItemContainerWrapper.id = `freighter-carousel-item-container-wrapper-${this.carouselID}`;

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
    carouselItemContainer.classList.add("freighter-carousel-item-container");
    carouselItemContainer.id = `freighter-carousel-item-container-${this.carouselID}`;

    // Add the carousel items to the carousel item container. They are added in the
    // same order, and will be processed later.
    carouselItems.forEach((carouselItem) => {
      carouselItemContainer.appendChild(carouselItem);
    });

    // Add the transitionend event listener to the carousel item container. This
    // event listener will be used to determine when the carousel has finished
    // scrolling, which allows for the carousel items that are no longer visible
    // to be removed from the DOM safely.
    this.transitionEndEventListener = (event: Event) => {
      // Return if the transitionend event is not for the carousel item container,
      // but is instead fired for one of the carousel items.
      if (event.target !== this.carouselItemContainer) {
        return;
      }

      // Get the current length of the carousel item container.
      const carouselItemContainerLength = carouselItemContainer.children.length;

      // If the previous scroll was left, remove items from the right
      // side of the carousel item container.
      if (this.prevScroll === "left") {
        for (
          let i = carouselItemContainerLength - 1;
          i > carouselItemContainerLength - 1 - this.currentScrollBy * 2;
          i--
        ) {
          carouselItemContainer.children[i].remove();
        }

        // Transform the carousel item container back to its original position
        this.transformCarouselItems(0);
      }

      // If the previous scroll was right, remove items from the left
      // side of the carousel item container.
      else if (this.prevScroll === "right") {
        for (let i = 0; i < this.currentScrollBy * 2; i++) {
          carouselItemContainer.children[0].remove();
        }

        // Transform the carousel item container back to its original position
        this.transformCarouselItems(0);
      }

      // Performs resizing if the carousel was resized while scrolling.
      this.resizeCarousel();

      // Allow the carousel to be scrolled again.
      this.isScrolling = false;

      // Start the next auto scroll timeout.
      if (this.autoScroll && !this.isHovering) {
        this.startAutoScrollTimeout();
      }
    };

    // Add the event listener to the container and return a reference to the
    // generated carousel item container.
    carouselItemContainer.addEventListener(
      "transitionend",
      this.transitionEndEventListener
    );
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
    button.classList.add(`freighter-carousel-arrow-${direction}`);
    button.id = `freighter-carousel-arrow-${direction}-${this.carouselID}`;

    // Add the event listener for scrolling to the left.
    if (direction === "left") {
      this.leftButtonClickListener = () => {
        if (!this.isScrolling && this.canScrollLeft) {
          // Clear the auto scroll timeout.
          clearTimeout(this.autoScrollTimeout);

          // For bezier transitions, the dummy items need to be hidden as
          // to insinuate that the carousel cannot be scrolled if the
          // wrapping method is none.
          const hideDummies =
            this.usingBezierTransition &&
            this.wrappingMethod === "none" &&
            !this.canScrollRight
              ? true
              : false;

          // Reposition the pointers.
          this.prevScroll = "left";
          this.adjustPointers(direction);

          // Add the appropriate number of carousel items to the left side.
          this.carouselItemContainer.prepend(
            ...this.getCarouselItems(
              this.currentScrollBy,
              this.leftCarouselPointer
            )
          );

          // Add the matching number of dummy items to the right side.
          const nextItems = this.getCarouselItems(
            this.currentScrollBy,
            this.usingBezierTransition
              ? this.rightCarouselPointer + this.currentScrollBy
              : 0,
            this.usingBezierTransition
          );
          nextItems.forEach((item) => {
            item.classList.add("frieght-carousel-item-dummy");

            // If we are using the bezier transition, and the wrap method is
            // none, the dummy items should be hidden.
            if (hideDummies) {
              item.style.visibility = "hidden";
            }
          });
          this.carouselItemContainer.append(...nextItems);

          // Adjust the carousel's position, and transform it with animation.
          this.transformCarouselItems(-1);

          // Allow the next scrolling input.
          this.isScrolling = true;
        }
      };
      button.addEventListener("click", this.leftButtonClickListener);
    }

    // Add the event listener for scrolling to the right.
    else if (direction === "right") {
      this.rightButtonClickListener = () => {
        if (!this.isScrolling && this.canScrollRight) {
          while (this.rightCarouselPointer >= this.allItems.length) {
            this.rightCarouselPointer -= this.allItems.length;
          }

          // For bezier transitions, the dummy items need to be hidden as
          // to insinuate that the carousel cannot be scrolled if the
          // wrapping method is none.
          const hideDummies =
            this.usingBezierTransition &&
            this.wrappingMethod === "none" &&
            !this.canScrollLeft
              ? true
              : false;

          // Clear the auto scroll timeout.
          clearTimeout(this.autoScrollTimeout);

          // Reposition the pointers.
          this.prevScroll = "right";
          this.adjustPointers(direction);

          // Add the appropriate number of carousel items to the right.
          this.carouselItemContainer.append(
            ...this.getCarouselItems(
              this.currentScrollBy,
              this.rightCarouselPointer - this.currentScrollBy
            )
          );

          // Add the matching number of dummy items to the left side.
          const prevItems = this.getCarouselItems(
            this.currentScrollBy,
            this.usingBezierTransition
              ? this.leftCarouselPointer - this.currentScrollBy * 2
              : 0,
            this.usingBezierTransition
          );
          prevItems.forEach((item) => {
            item.classList.add("frieght-carousel-item-dummy");

            // If we are using the bezier transition, and the wrap method is
            // none, the dummy items should be hidden.
            if (hideDummies) {
              item.style.visibility = "hidden";
            }
          });
          this.carouselItemContainer.prepend(...prevItems);

          // Adjust the carousel's position, and transform it with animation.
          this.transformCarouselItems(1);

          // Allow the next scrolling input.
          this.isScrolling = true;
        }
      };
      button.addEventListener("click", this.rightButtonClickListener);
    }

    // Return a reference to the generated carousel control button.
    return button;
  }

  /**
   * Configures the carousel items. Note that as a prerequisite, the carousel
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

    // If we are restoring from state, need to unwrap each item from
    // its previouse carouselItem container.
    let updatedCarouselItems: HTMLElement[] = [];
    carouselItems.forEach((item) => {
      if (item.classList.contains("freighter-carousel-item")) {
        updatedCarouselItems.push(item.children[0] as HTMLElement);
      } else {
        updatedCarouselItems.push(item);
      }
    });

    // Create a new div, apply the appropriate class and id, and append
    // the actual content to each carousel item.
    const newCarouselItems: HTMLElement[] = [];
    updatedCarouselItems.forEach((carouselItem, index) => {
      // Create the new div.
      const newDiv = document.createElement("div");
      newDiv.classList.add("freighter-carousel-item");
      newDiv.id = `freighter-carousel-item-${this.carouselID}-${index}`;

      // Append the actual content to the new div.
      newDiv.append(carouselItem);
      newCarouselItems.push(newDiv);
    });

    // Return the array of carousel items, and indicates that the carousel
    // container has been configured.
    this.carouselItemsConfigured = true;
    return newCarouselItems;
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
    if (this.scrollable) {
      this.applyCarouselButtonStyles("left");
      this.applyCarouselButtonStyles("right");
    }
  }

  /**
   * Applies the styles to the carousel container.
   * @returns {void} Nothing.
   */
  private applyCarouselContainerStyles(): void {
    // The width of the main container is dependend on the resize mode.
    this.carouselContainer.style.width =
      this.resizingMethod === "none" ? "fit-content" : "100%";
    this.carouselContainer.style.margin =
      this.resizingMethod === "none" ? "0 auto" : "0";

    // The position should be relative to allow for the absolute positioning of
    // the carousel control buttons.
    this.carouselContainer.style.position = "relative";
    this.carouselContainer.style.display = "flex";
    this.carouselContainer.style.flexDirection = "column";
    this.carouselContainer.style.justifyContent = "center";
  }

  /**
   * Applies the styles to the carousel item container wrapper.
   * @returns {void} Nothing.
   */
  private applyCarouselItemContainerWrapperStyles(): void {
    // Get the carousel item container wrapper from the carousel container.
    const carouselItemContainerWrapper: HTMLElement | null =
      this.carouselContainer.querySelector(
        `.freighter-carousel-item-container-wrapper#freighter-carousel-item-container-wrapper-${this.carouselID}`
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
        `.freighter-carousel-item-container#freighter-carousel-item-container-${this.carouselID}`
      ) as HTMLElement;

    // Display flex to appropriately space out the carousel items.
    carouselItemContainer.style.display = "flex";
    carouselItemContainer.style.justifyContent = "center";
    carouselItemContainer.style.gap = `${this.itemSpacing}px`;

    // The width is dependend on the resize mode.
    if (this.resizingMethod === "none") {
      carouselItemContainer.style.width = `${
        this.itemWidth * this.numItemsVisible +
        this.itemSpacing * (this.numItemsVisible - 1)
      }px`;
    } else {
      carouselItemContainer.style.width = "100%";
    }

    // A transition must be applied in order to trigger transitionend events.
    carouselItemContainer.style.transition = this.transition;
  }

  /**
   * Applies the styles to the carousel items.
   * @returns {void} Nothing.
   */
  private applyCarouselItemStyles(): void {
    // Need to loop through all the carousel items.
    this.allItems.forEach((carouselItem) => {
      // Set the width and height of the carousel items based on the constructor.
      carouselItem.style.width = `${this.itemWidth}px`;

      // Source of adding and removing item flashing. Stretch-scale doesn't need
      // to set an explicit height; the aspect ratio will be preserved.
      if (this.resizingMethod !== "stretch-scale") {
        carouselItem.style.height = `${this.itemHeight}px`;
      }

      // The carousel items should by default not be allowed to shrink.
      carouselItem.style.flexShrink = "0";
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
        `.freighter-carousel-arrow-${direction}#freighter-carousel-arrow-${direction}-${this.carouselID}`
      ) as HTMLElement;

    // Other required styles.
    carouselButton.style.zIndex = "1";
    carouselButton.style.padding = "1px 6px";
    carouselButton.style.margin = "0";

    // Add the SVG icon to the button.
    carouselButton.innerHTML = `
    <svg
      fill="black"
      style="max-width: 60%; max-height: 60%;"
      viewBox="0 0 46.001 85.999"
    >
      ${
        direction === "right"
          ? '<path d="M1.003,80.094c-1.338,1.352-1.338,3.541,0,4.893c1.337,1.35,3.506,1.352,4.845,0l39.149-39.539  c1.338-1.352,1.338-3.543,0-4.895L5.848,1.014c-1.339-1.352-3.506-1.352-4.845,0c-1.338,1.352-1.338,3.541-0.001,4.893L36.706,43 L1.003,80.094z"/>'
          : '<path d="M44.998,80.094c1.338,1.352,1.338,3.541,0,4.893c-1.336,1.35-3.506,1.352-4.844,0L1.003,45.447  c-1.338-1.352-1.338-3.543,0-4.895l39.15-39.539c1.338-1.352,3.506-1.352,4.844,0S46.335,4.555,45,5.906L9.294,43L44.998,80.094z"/>'
      }
    </svg>`;

    // Set the static chevron colors with either default or directional overrides.
    let fillColorStatic = this.buttonStyles.color as string;
    if (direction === "left" && this.leftButtonStyles.color) {
      fillColorStatic = this.leftButtonStyles.color;
    }
    if (direction === "right" && this.rightButtonStyles.color) {
      fillColorStatic = this.rightButtonStyles.color;
    }

    // Set the hover chevron colors with either default or directional overrides.
    let fillColorHover =
      this.buttonHoverStyles.color !== undefined
        ? this.buttonHoverStyles.color
        : fillColorStatic;
    if (direction === "left" && this.leftButtonHoverStyles.color) {
      fillColorHover = this.leftButtonHoverStyles.color;
    }
    if (direction === "right" && this.rightButtonHoverStyles.color) {
      fillColorHover = this.rightButtonHoverStyles.color;
    }

    // Names for each style; used for looping.
    const styleNames: string[] = [
      "width",
      "height",
      "borderTop",
      "borderBottom",
      "borderLeft",
      "borderRight",
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius",
      "backgroundColor",
      "cursor",
      "transition",
    ];

    // Apply the static button styles.
    this.applyMassButtonStyles(
      carouselButton as HTMLButtonElement,
      direction,
      styleNames,
      this.buttonStyles,
      this.leftButtonStyles,
      this.rightButtonStyles,
      fillColorStatic
    );

    // Set the hover styles for the button.
    const mouseEnterListener = () => {
      this.applyMassButtonStyles(
        carouselButton as HTMLButtonElement,
        direction,
        styleNames,
        this.buttonHoverStyles,
        this.leftButtonHoverStyles,
        this.rightButtonHoverStyles,
        fillColorHover
      );
    };
    const mouseLeaveListener = () => {
      this.applyMassButtonStyles(
        carouselButton as HTMLButtonElement,
        direction,
        styleNames,
        this.buttonStyles,
        this.leftButtonStyles,
        this.rightButtonStyles,
        fillColorStatic as string
      );
    };
    carouselButton.addEventListener("mouseenter", mouseEnterListener);
    carouselButton.addEventListener("mouseleave", mouseLeaveListener);

    // Store the proper reference to the event listeners.
    if (direction === "left") {
      this.leftButtonMouseEnterListener = mouseEnterListener;
      this.leftButtonMouseLeaveListener = mouseLeaveListener;
    } else {
      this.rightButtonMouseEnterListener = mouseEnterListener;
      this.rightButtonMouseLeaveListener = mouseLeaveListener;
    }

    // Position the button based on the user's options.
    carouselButton.style.position = "absolute";
    switch (
      direction === "left"
        ? this.leftButtonStyles.position
        : this.rightButtonStyles.position
    ) {
      case "top":
        carouselButton.style.top = "0";
        break;
      case "bottom":
        carouselButton.style.bottom = "0";
        break;
      case "center":
        carouselButton.style.bottom = "50%";
        carouselButton.style.transform = "translateY(50%)";
        break;
    }
    if (direction === "left") {
      carouselButton.style.left = "0";
    }
    if (direction === "right") {
      carouselButton.style.right = "0";
    }
  }

  /**
   * Applies the button styles en masse. These styles change as the user hovers
   * over the buttons, and each may need to have different styles applied
   * appropriately.
   * @param {HTMLButtonElement} carouselButton The button to apply the styles to.
   * @param {string} direction The direction of the button.
   * @param {string[]} styleNames The names of the styles to apply.
   * @param {string[]} values The values of the styles to apply.
   * @returns {void} Nothing.
   */
  private applyMassButtonStyles(
    carouselButton: HTMLButtonElement,
    direction: string,
    styleNames: string[],
    buttonStyles: ButtonStyle,
    leftButtonStyles: ButtonStyle,
    rightButtonStyles: ButtonStyle,
    fillColor: string
  ): void {
    // Apply the styles common to both buttons.
    styleNames.forEach((styleName) => {
      carouselButton.style[styleName as any] = (buttonStyles as any)[styleName];

      // If adding transition, make sure to apply it to the chevron as well.
      if (styleName === "transition") {
        (
          carouselButton.children[0].children[0] as HTMLElement
        ).style.transition = buttonStyles.transition as string;
      }
    });

    // Apply the correct left, right, or default styles to the button.
    styleNames.forEach((styleName) => {
      if (direction === "left" && (leftButtonStyles as any)[styleName]) {
        carouselButton.style[styleName as any] = (leftButtonStyles as any)[
          styleName
        ];

        // If adding transition, make sure to apply it to the chevron as well.
        if (styleName === "transition") {
          (
            carouselButton.children[0].children[0] as HTMLElement
          ).style.transition = leftButtonStyles.transition as string;
        }
      }
      if (direction === "right" && (rightButtonStyles as any)[styleName]) {
        carouselButton.style[styleName as any] = (rightButtonStyles as any)[
          styleName
        ];

        // If adding transition, make sure to apply it to the chevron as well.
        if (styleName === "transition") {
          (
            carouselButton.children[0].children[0] as HTMLElement
          ).style.transition = rightButtonStyles.transition as string;
        }
      }
    });

    // Apply the correct fill color for the chevron.
    carouselButton.children[0].children[0].setAttribute("fill", fillColor);
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
        this.itemWidth * this.numItemsVisible) /
      (this.numItemsVisible + 1);

    // Set the gap size to the larger of the computed gap and the minimum gap
    // size provided by the constructor.
    this.carouselItemContainer.style.gap =
      computedGap > this.itemSpacing
        ? computedGap + "px"
        : this.itemSpacing + "px";
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
      // or flex growing. If there are no children, size back to the original height.
      if (!(this.carouselItemContainer.children.length === 0)) {
        try {
          this.itemWidth = parseFloat(
            getComputedStyle(
              this.carouselItemContainer.children[0] as HTMLElement
            ).width
          );
        } catch (error) {
          console.log(
            "Tried getting the computed style for a carousel item, caught the following exception:",
            error
          );
        }
      } else {
        this.itemWidth = this.originalItemWidth;
      }

      // If the resize method is 'stretch-scale', the carousel items preserve
      // their aspect ratio. Otherwise, the height remains the same.
      const computedHeight =
        this.resizingMethod === "stretch-scale"
          ? this.itemAspectRatio * this.itemWidth
          : this.itemHeight;

      // Set the new width and height of each active carousel item, and remove the flex
      // grow and shrink properties. This prevents the carousel items from
      // resizing again when next and dummy items are added.
      for (let i = 0; i < this.carouselItemContainer.children.length; i++) {
        (this.carouselItemContainer.children[i] as HTMLElement).style.width =
          this.itemWidth + "px";
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
      this.allItems.forEach((carouselItem) => {
        carouselItem.style.width = `${this.itemWidth}px`;
        carouselItem.style.height = `${computedHeight}px`;
        carouselItem.style.flexGrow = "0";
        carouselItem.style.flexShrink = "0";
      });

      setTimeout(() => {
        // Check for height changes and resize the carousel item container.
        this.resizeCarouselItemContainer();

        // Used to properly resize buttons when using percentages.
        if (
          this.buttonStyles.height?.includes("%") ||
          this.leftButtonStyles.height?.includes("%") ||
          this.rightButtonStyles.height?.includes("%")
        ) {
          setTimeout(() => {
            this.carouselContainer.style.height = `${parseFloat(
              getComputedStyle(this.carouselItemContainer as HTMLElement).height
            )}px`;
          }, 0);
        }
      }, 0);
    }, 0);
  }

  /**
   * Single parameter constructor. Accepts a CarouselOptions object. with desired
   * carousel options. The constructor initializes all class attributes, configures
   * all elements within the carousel container, styles the elements, and initializes
   * the carousel with the correct starting elements based on the carousel options.
   * @param {CarouselOptions | CarouselState} options An object of the type CarouselOptions
   * or CarouselState. Pass in a CarouselOptions object to initialize a new carousel, and
   * pass in a CarouselState object to restore a carousel from a previous state.
   * Carousel will be constructed from the passed in state.
   * @returns {Carousel} A new Carousel object.
   */
  constructor(options: CarouselOptions | CarouselState) {
    // Determine if the constructor is being called with a CarouselOptions object
    // or a CarouselState object.
    const constructFromState =
      (options as CarouselState).carouselID !== undefined;

    // Initialize the required class attributes. Set their defaults to "none" if
    // they are not explicitly provided.
    this.resizingMethod =
      options.resizingMethod === "stretch-populate"
        ? "stretch-gap"
        : options.resizingMethod
        ? options.resizingMethod
        : "none";
    this.wrappingMethod = options.wrappingMethod
      ? options.wrappingMethod
      : "none";

    // Initialize the optional class attributes.
    this.itemWidth = options.itemWidth !== undefined ? options.itemWidth : 225;
    this.itemHeight =
      options.itemHeight !== undefined ? options.itemHeight : 150;
    this.itemSpacing =
      options.itemSpacing !== undefined ? options.itemSpacing : 0;
    this.buttonStyles = {
      width: "25px",
      height: "80%",
      position: "center",
      borderTop: "none",
      borderRight: "none",
      borderBottom: "none",
      borderLeft: "none",
      backgroundColor: "rgba(100, 100, 100, 0.5)",
      color: "rgba(50, 50, 50, 0.75)",
      cursor: "pointer",
      transition: "all 200ms ease",
      ...options.buttonStyles,
    };
    this.buttonHoverStyles = {
      backgroundColor: "rgba(100, 100, 100, 0.8)",
      transition: "all 200ms ease",
      ...options.buttonHoverStyles,
    };
    this.leftButtonStyles = {
      borderTopRightRadius: "5px",
      borderBottomRightRadius: "5px",
      ...options.leftButtonStyles,
    };
    this.leftButtonHoverStyles =
      options.leftButtonHoverStyles !== undefined
        ? options.leftButtonHoverStyles
        : {};
    this.rightButtonStyles = {
      borderTopLeftRadius: "5px",
      borderBottomLeftRadius: "5px",
      ...options.rightButtonStyles,
    };
    this.rightButtonHoverStyles =
      options.rightButtonHoverStyles !== undefined
        ? options.rightButtonHoverStyles
        : {};
    this.scrollable =
      options.scrollable !== undefined ? options.scrollable : true;
    this.autoScroll =
      options.autoScroll !== undefined ? options.autoScroll : false;
    this.autoScrollInterval =
      options.autoScrollInterval !== undefined
        ? options.autoScrollInterval
        : 1000;
    this.autoScrollDirection =
      options.autoScrollDirection !== undefined
        ? options.autoScrollDirection
        : "right";
    this.autoScrollPauseOnHover = options.autoScrollPauseOnHover
      ? options.autoScrollPauseOnHover
      : false;
    this.scrollBy = options.scrollBy !== undefined ? options.scrollBy : 1;
    this.numItemsVisible =
      options.numItemsVisible !== undefined ? options.numItemsVisible : 1;
    this.syncScrollWithVisibility =
      options.syncScrollWithVisibility !== undefined
        ? options.syncScrollWithVisibility
        : false;
    this.transitionDuration =
      options.transitionDuration !== undefined
        ? options.transitionDuration
        : 500;
    this.transitionDelay =
      options.transitionDelay !== undefined ? options.transitionDelay : 0;
    this.transitionTimingFunction =
      options.transitionTimingFunction !== undefined
        ? options.transitionTimingFunction
        : "ease-in-out";
    this.transition = `transform 
        ${this.transitionDuration}ms 
        ${this.transitionTimingFunction} 
        ${this.transitionDelay}ms`;

    // Initialize the carousel internal data.
    this.itemAspectRatio = this.itemHeight / this.itemWidth;
    this.originalItemHeight = this.itemHeight;
    this.originalItemWidth = this.itemWidth;
    this.originalScrollBy = this.scrollBy;

    // The current amount to scroll should default to the user's indicated amount.
    // If the user wants to sync the scroll amount with the number of items visible,
    // this is done here as well.
    this.scrollBy = this.syncScrollWithVisibility
      ? this.numItemsVisible
      : this.scrollBy;
    this.currentScrollBy = this.scrollBy;

    // Give the carousel a unique internal ID if it is being constructed from
    // a CarouselOptions object.
    this.carouselID = constructFromState
      ? (options as CarouselState).carouselID
      : ++Carousel.maxID;

    // Configure the main carousel container and carousel item container. If
    // restoring from state, indicate this so that the correct Carousel items
    // are passed down.
    this.carouselContainer = this.configureCarouselContainer(
      options.containerID,
      (options as CarouselState).carouselItems
    );
    try {
      this.carouselItemContainer = this.carouselContainer.children[0]
        .children[0] as HTMLElement;
    } catch (error) {
      console.log(
        "Tried getting the carousel item container from the configured carousel container, caught the following exception:",
        error
      );
      this.carouselItemContainer = document.createElement("div");
    }

    // Configure the carousel items.
    this.allItems = this.configureCarouselItems();

    // Cannot allow smart wrapping if the carousel has fewer items than items visible.
    if (
      this.wrappingMethod === "wrap-smart" &&
      this.numItemsVisible > this.allItems.length
    ) {
      console.warn(
        `Carousel ID "${options.containerID}": Cannot allow smart wrapping if the carousel has fewer items than items visible. Setting wrapping method to 'wrap-simple'.`
      );
      this.wrappingMethod = "wrap-simple";
    }

    // Configure and add the carousel buttons.
    const leftCarouselButton = this.configureCarouselButton("left");
    const rightCarouselButton = this.configureCarouselButton("right");

    // Only add the buttons if the carousel is scrollable.
    if (this.scrollable) {
      this.carouselContainer.prepend(leftCarouselButton);
      this.carouselContainer.append(rightCarouselButton);
    }

    // Initialize the carousel with the correct starting data depending on
    // whether the carousel is being constructed from a CarouselOptions object
    // or a CarouselState object.
    if (constructFromState) {
      this.leftCarouselPointer = (options as CarouselState).leftCarouselPointer;
    } else {
      this.leftCarouselPointer = 0;
    }
    this.rightCarouselPointer = this.numItemsVisible + this.leftCarouselPointer;

    // The carousel cannot be scrolled if there are no items in it, or if there
    // is no wrap option and we are at the end of the carousel on either side.
    this.canScrollLeft =
      this.wrappingMethod === "none" && this.leftCarouselPointer === 0
        ? false
        : this.allItems.length > 0;
    this.canScrollRight =
      this.wrappingMethod === "none" &&
      (this.allItems.length <= this.numItemsVisible ||
        this.rightCarouselPointer === this.allItems.length)
        ? false
        : this.allItems.length > 0;
    this.isScrolling = false;
    this.prevScroll = "";
    this.usingBezierTransition = options.transitionTimingFunction
      ? options.transitionTimingFunction.startsWith("cubic-bezier")
      : false;

    // Apply the appropriate styles to each class.
    this.applyStyles();

    // Initialize the order of the carousel items.
    this.initializeCarousel();

    // Adjust the initial size of the carousel items based on the resizing method.
    this.resizeCarousel();

    // Should also try resizing the height in case a change from one resizing method
    // to anothe is made. Because the height of the children may cause the parent to
    // change height, the height of the parent should be checked and adjusted after
    // the fact by calling the same method again.
    this.resizeCarouselItemContainer();
    this.resizeCarouselItemContainer();

    // Should transform the carousel items instantly to reflect the previous position
    // of the carousel if restoring from state.
    if (constructFromState) {
      this.transitionEndEventListener(new Event("transitionend"));
    }

    // Add the correct event listeners to the window for resizing the carousel based
    // on the resizing method.
    if (this.resizingMethod === "stretch-gap") {
      this.parentResizeObserver = new ResizeObserver(() => {
        if (!this.isScrolling) {
          this.resizeGap();
        }
      });
      this.parentResizeObserver.observe(
        this.carouselContainer.parentElement as HTMLElement
      );
    } else if (
      this.resizingMethod === "stretch" ||
      this.resizingMethod === "stretch-scale"
    ) {
      this.parentResizeObserver = new ResizeObserver(() => {
        if (!this.isScrolling) {
          this.resizeScale();
        }
      });
      this.parentResizeObserver.observe(
        this.carouselContainer.parentElement as HTMLElement
      );
    }

    // Start the next auto scroll timeout.
    if (this.autoScroll && !this.isHovering) {
      this.startAutoScrollTimeout();
    }
  }

  /**
   * Returns carousel items from the starting index provided from this.carouselItems.
   * Will loop around to the beginning of this.carouselItems if the starting index
   * provided is greater than or less than the length of this.carouselItems, or if
   * the index progresses past the end of this.carouselItems.
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
    const itemsLength = this.allItems.length;
    const result: HTMLElement[] = [];

    // If the starting index is negative, wrap around to the other end.
    while (start < 0) {
      start = itemsLength + start;
    }

    // Start at the start index and get n items, wrapping anytime the index
    // progresses past the end of this.allCarouselItems (using modulo).
    for (let i = start; i < start + numItems; i++) {
      result.push(
        this.allItems[i % itemsLength]?.cloneNode(deep) as HTMLElement
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
   * this.numItemsVisible carousel items are shown.
   * @returns {void} Nothing.
   */
  private initializeCarousel(): void {
    // The list of active carousel items. This will have size this.numItemsVisible.
    const activeCarouselItems: Element[] = [];

    // Fills the active carousel items list with the first this.numItemsVisible
    // items. May need to wrap around. If the wrap method is "none", do not wrap around.
    let timesWrapped = 0;
    let firstIteration = true;
    for (let i = 0; i < this.numItemsVisible; i++) {
      const element =
        this.allItems[(i + this.leftCarouselPointer) % this.allItems.length];

      // Keep track of the number of times that the index wraps around allCarouselItems.
      if (
        (i + this.leftCarouselPointer) % this.allItems.length === 0 &&
        !firstIteration
      ) {
        timesWrapped++;
      }

      // If wrap method is "none", just add a blank div with correct dimensions.
      if (this.wrappingMethod == "none" && timesWrapped > 0) {
        const dummyItem = document.createElement("div");
        dummyItem.classList.add("freighter-carousel-item");
        dummyItem.classList.add("frieght-carousel-item-dummy");
        dummyItem.style.width = `${this.itemWidth}px`;
        dummyItem.style.height = `${this.itemHeight}px`;
        activeCarouselItems.push(dummyItem);
      }

      // If we should wrap, clone the correct carousel item.
      else if (i < this.numItemsVisible && element) {
        activeCarouselItems.push((element as Node).cloneNode(true) as Element);
      }
      firstIteration = false;
    }

    // Replace the carousel items with the active carousel items. This ensures
    // that the only rendered items in the carousel are those being shown.
    this.carouselItemContainer.replaceChildren(...activeCarouselItems);
  }

  /**
   * Transform the carousel items to the correct position based on the current
   * carousel position.
   * @param {-1 | 0 | 1} direction The direction to move the carousel.
   * 0 is used to move to the center of the carousel, and indicates no animation.
   * @returns {void} Nothing.
   */
  private transformCarouselItems(direction: -1 | 0 | 1): void {
    // If the transform should not be animated, remove the transition property.
    if (direction === 0) {
      this.carouselItemContainer.style.transition = "none";
    }

    // Determine the amount of space currently between each carousel item. This
    // will have been changed if the resize method is "stretch-gap".
    const spacingAmount =
      this.resizingMethod === "stretch-gap"
        ? parseFloat(
            getComputedStyle(this.carouselItemContainer as HTMLElement).gap
          )
        : this.itemSpacing;

    // Apply the transformation the correct distance.
    this.carouselItemContainer.style.transform = `translateX(${
      -1 * direction * ((this.itemWidth + spacingAmount) * this.currentScrollBy)
    }px)`;

    // If the transform was not animated, add the transition property back. This
    // is done in a timeout to ensure that the transform is applied before the
    // transition is added back.
    if (direction === 0) {
      setTimeout(() => {
        this.carouselItemContainer.style.transition = this.transition;
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
      this.resizingMethod === "stretch-scale"
    ) {
      this.resizeScale();
    }
  }

  /**
   * Adjusts the height of the carousel item container based on the control button
   * height and the height of the carousel item container itself. Should be called
   * on each resize where carousel item heights change ("stretch-scale" resizing).
   * @returns {void} Nothing.
   */
  public resizeCarouselItemContainer(): void {
    // The height of the main container is the max of the left button height, the
    // right button height, and the carousel item container height.
    let maxHeight: number;

    // Only try to get the height of the buttons if the carousel is scrollable.
    if (!this.scrollable) {
      maxHeight = parseFloat(
        getComputedStyle(this.carouselItemContainer as HTMLElement).height
      );
    }

    // Otherwise, get the max of the item container and button heights.
    else {
      try {
        maxHeight = Math.max(
          parseFloat(
            getComputedStyle(this.carouselContainer.children[0] as HTMLElement)
              .height
          ),
          parseFloat(
            getComputedStyle(this.carouselItemContainer as HTMLElement).height
          ),
          parseFloat(
            getComputedStyle(this.carouselContainer.children[2] as HTMLElement)
              .height
          )
        );
      } catch (error) {
        console.log(
          "Tried getting the computed style of a carousel item, caught the following exception:",
          error
        );
        maxHeight = 0;
      }
    }
    this.carouselContainer.style.height = `${maxHeight}px`;
  }

  /**
   * Adjusts the top and bottom pointers of the carousel items to be the correct
   * values based on the current carousel position. Specifically, this method
   * keeps the top and bottom pointers within the range of [0, length) so that
   * when items are added or removed, the entire carousel is not shifted to one
   * direction if the position comes after all of the elements on screen.
   * @param {"left" | "right"} direction The direction that the carousel is being
   * scrolled. This is used to determine how to adjust pointers.
   * @returns {void} Nothing.
   */
  private adjustPointers(direction: "left" | "right"): void {
    // Simple wrapping does not need to worry about changing how much the carousel
    // should scroll by from click to click.
    if (
      this.wrappingMethod === "wrap-smart" ||
      this.wrappingMethod === "none"
    ) {
      // Always reset the amount to scroll and canScroll values.
      this.currentScrollBy = this.scrollBy;
      this.canScrollLeft = true;
      this.canScrollRight = true;

      // If a carousel has an equal number of total items and items visible, then
      // smart wrapping always shifts the carousel by the number of items visible.
      if (this.allItems.length === this.numItemsVisible) {
        this.currentScrollBy = this.numItemsVisible;
      }

      // If the user is scrolling left, they are either:
      //  1. At the beginning of the carousel will roll over to the end.
      //  2. In the middle of the carousel and will roll over to the end.
      //  3. In the middle of the carousel and won't roll over to the end.
      else if (direction === "left") {
        // 1. At the beginning of the carousel and will roll over to the end.
        // Need to shift everything over by an entire numItemsVisible amount.
        if (this.leftCarouselPointer === 0) {
          this.currentScrollBy = this.numItemsVisible;
        }

        // 2. In the middle of the carousel and will roll over to the end.
        // Determine how many positions to shift over, update scroll amount.
        else if (this.leftCarouselPointer < this.scrollBy) {
          this.currentScrollBy = this.leftCarouselPointer;
        }

        // 3. In the middle of the carousel and won't roll over to the end.
        // No special actions need to be taken.
        else if (this.leftCarouselPointer >= this.scrollBy) {
        }
      }

      // If the user is scrolling right, they are either:
      //  1. At the end of the carousel and will roll over to the beginning.
      //  2. In the middle of the carousel and will roll over to the beginning.
      //  3. In the middle of the carousel and won't roll over to the beginning.
      else if (direction === "right") {
        // 1. At the end of the carousel and will roll over to the beginning.
        // Need to shift everything over by an entire numItemsVisible amount.
        if (this.rightCarouselPointer === 0) {
          this.currentScrollBy = this.numItemsVisible;
        }

        // 2. In the middle of the carousel and will roll over to the beginning.
        // Determine how many positions to shift over, update scroll amount.
        else if (
          this.scrollBy + this.rightCarouselPointer >
          this.allItems.length
        ) {
          this.currentScrollBy =
            this.allItems.length - this.rightCarouselPointer;
        }

        // 3. In the middle of the carousel and won't roll over to the beginning.
        // No special actions need to be taken.
        else if (
          this.scrollBy + this.rightCarouselPointer <=
          this.allItems.length
        ) {
        }
      }
    }

    // If the currentScrollBy happens to become negative (through deletion of items),
    // this will ensure that the carousel does not shift to the left to blank spaces.
    if (this.currentScrollBy < 0) {
      this.currentScrollBy = this.numItemsVisible + this.currentScrollBy;
    }

    // Based on the direction of the scroll, adjust the pointers. They should only
    // be adjusted the currentScrollBy value, which may be less than the
    // scrollyBy value if the carousel is being scrolled at the start or end.
    if (direction === "left") {
      this.leftCarouselPointer -= this.currentScrollBy;
      this.rightCarouselPointer -= this.currentScrollBy;
    } else if (direction === "right") {
      this.leftCarouselPointer += this.currentScrollBy;
      this.rightCarouselPointer += this.currentScrollBy;
    }

    // Need to ensure that both pointers remain within their valid ranges.
    while (this.leftCarouselPointer >= this.allItems.length) {
      this.leftCarouselPointer -= this.allItems.length;
    }
    while (this.rightCarouselPointer >= this.allItems.length) {
      this.rightCarouselPointer -= this.allItems.length;
    }
    while (this.leftCarouselPointer < 0) {
      this.leftCarouselPointer += this.allItems.length;
    }
    while (this.rightCarouselPointer < 0) {
      this.rightCarouselPointer += this.allItems.length;
    }

    // Determine if the carousel can scroll left or right.
    if (this.wrappingMethod === "none" && this.leftCarouselPointer === 0) {
      this.canScrollLeft = false;
    }
    if (this.wrappingMethod === "none" && this.rightCarouselPointer === 0) {
      this.canScrollRight = false;
    }
  }

  /**
   * Returns the current state of the carousel. This is used by the Freighter class
   * when creating a new carousel with slightly different settings. The current
   * state should be preserved, and only the settings that are different should be
   * changed.
   * @returns {CarouselState} The current state of the carousel.
   */
  public getCurrentState(): CarouselState {
    return {
      itemWidth: this.originalItemWidth,
      itemHeight: this.originalItemHeight,
      itemSpacing: this.itemSpacing,
      buttonStyles: this.buttonStyles,
      buttonHoverStyles: this.buttonHoverStyles,
      leftButtonStyles: this.leftButtonStyles,
      leftButtonHoverStyles: this.leftButtonHoverStyles,
      rightButtonStyles: this.rightButtonStyles,
      rightButtonHoverStyles: this.rightButtonHoverStyles,
      numItemsVisible: this.numItemsVisible,
      scrollBy: this.originalScrollBy,
      containerID: (this.carouselContainer.parentElement as HTMLElement).id,
      transitionDuration: this.transitionDuration,
      transitionDelay: this.transitionDelay,
      transitionTimingFunction: this.transitionTimingFunction,
      resizingMethod: this.resizingMethod,
      carouselID: this.carouselID,
      carouselItems: this.allItems,
      leftCarouselPointer: this.leftCarouselPointer,
      scrollable: this.scrollable,
      autoScroll: this.autoScroll,
      autoScrollInterval: this.autoScrollInterval,
      autoScrollDirection: this.autoScrollDirection,
      autoScrollPauseOnHover: this.autoScrollPauseOnHover,
      wrappingMethod: this.wrappingMethod,
      carouselContainer: this.carouselContainer,
      syncScrollWithVisibility: this.syncScrollWithVisibility,
    };
  }

  /**
   * Begins the next timeout for the auto-scrolling carousel. Called first by the
   * constructor, and then each time the carousel container transition ends.
   * @returns {void} Nothing.
   */
  private startAutoScrollTimeout(): void {
    this.autoScrollTimeout = window.setTimeout(() => {
      const wasScrollable = this.scrollable;
      switch (this.autoScrollDirection) {
        case "left":
          this.scrollable = true;
          this.leftButtonClickListener(new Event("click"));
          this.scrollable = wasScrollable;
          break;
        case "right":
          this.scrollable = true;
          this.rightButtonClickListener(new Event("click"));
          this.scrollable = wasScrollable;
          break;
      }
    }, this.autoScrollInterval);
  }

  public removeAllEventListeners(): void {
    // Remove clicks from both buttons if the carousel is scrollable.
    if (this.scrollable) {
      try {
        this.carouselContainer.children[0].removeEventListener(
          "click",
          this.leftButtonClickListener
        );
        this.carouselContainer.children[2].removeEventListener(
          "click",
          this.rightButtonClickListener
        );
      } catch (error) {
        console.log(
          "Tried removing event listeners from carousel buttons, caught the following exception:",
          error
        );
      }
    }

    // Remove the mouse enter and leave events from the carousel container.
    try {
      this.carouselContainer.removeEventListener(
        "mouseenter",
        this.containerMouseEnterListener
      );
      this.carouselContainer.removeEventListener(
        "mouseleave",
        this.containerMouseLeaveListener
      );
    } catch (error) {
      console.log(
        "Tried removing event listeners from carousel container, caught the following exception:",
        error
      );
    }

    // Remove the mouse enter and leave events from the carousel buttons if the
    // carousel is scrollable.
    if (this.scrollable) {
      try {
        this.carouselContainer.children[0].removeEventListener(
          "mouseenter",
          this.leftButtonMouseEnterListener
        );
        this.carouselContainer.children[0].removeEventListener(
          "mouseleave",
          this.leftButtonMouseLeaveListener
        );
        this.carouselContainer.children[2].removeEventListener(
          "mouseenter",
          this.rightButtonMouseEnterListener
        );
        this.carouselContainer.children[2].removeEventListener(
          "mouseleave",
          this.rightButtonMouseLeaveListener
        );
      } catch (error) {
        console.log(
          "Tried removing event listeners from carousel buttons, caught the following exception:",
          error
        );
      }
    }

    // Remove transition end from the carousel item container.
    this.carouselItemContainer.removeEventListener(
      "transitionend",
      this.transitionEndEventListener
    );

    // Remove resize from the parent container.
    this.parentResizeObserver.disconnect();

    // Remove auto scroll timeout.
    clearTimeout(this.autoScrollTimeout);
  }
}
