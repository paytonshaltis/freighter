/**
 * Type definition for the options object to be passed to the carousel constructor.
 */
type CarouselOptions = {
  containerID: string;
  resizingMethod:
    | "none"
    | "stretch"
    | "stretch-gap"
    | "stretch-scale"
    | "stretch-populate";
  wrappingMethod: "none" | "wrap-simple" | "wrap-smart";
  itemWidth?: number;
  itemHeight?: number;
  itemSpacing?: number;
  buttonWidth?: string;
  buttonHeight?: string;
  buttonPosition?: "top" | "center" | "bottom";
  scrollable?: boolean;
  scrollBy?: number;
  numItemsVisible?: number;
  syncScrollWithVisibility?: boolean;
  autoScroll?: boolean;
  autoScrollInterval?: number;
  autoScrollDirection?: "left" | "right";
  autoScrollPauseOnHover?: boolean;
  transitionDuration?: number;
  transitionDelay?: number;
  transitionTimingFunction?: string;
};

/**
 * Validates all the options passed to the carousel constructor. Checks for the
 * correct ranges and types of the options. Note that CarouselState objects can
 * be passed to this function as well, since they are a superset of the
 * CarouselOptions type. None of their properties will be checked, however, since
 * they cannot be invalid (no user input of these values is possible).
 * @param {CarouselOptions} options The options object to be validated.
 * @returns {void} Nothing.
 */
export function validateCarouselOptions(options: CarouselOptions): void {
  // Container ID is always required.
  if (options.containerID.length === 0) {
    throw new Error("containerID must be a non-empty string.");
  }

  // Resizing method is always required.
  if (
    options.resizingMethod !== "none" &&
    options.resizingMethod !== "stretch" &&
    options.resizingMethod !== "stretch-gap" &&
    options.resizingMethod !== "stretch-scale" &&
    options.resizingMethod !== "stretch-populate"
  ) {
    throw new Error(
      "resizingMethod must be one of the following: 'none', 'stretch', 'stretch-gap', 'stretch-scale'."
    );
  }

  // Wrapping method is always required.
  if (
    options.wrappingMethod !== "wrap-simple" &&
    options.wrappingMethod !== "wrap-smart" &&
    options.wrappingMethod !== "none"
  ) {
    throw new Error(
      "wrappingMethod must be one of the following: 'none', 'wrap-simple', 'wrap-smart'."
    );
  }

  // Only stretch-scale and stretch don't need an exact width.
  if (
    options.resizingMethod !== "stretch-scale" &&
    options.resizingMethod !== "stretch" &&
    (!options.itemWidth || (options.itemWidth && options.itemWidth < 0))
  ) {
    throw new Error(
      "Carousels using a resizing method other than 'stretch-scale' and 'stretch' require a defined itemWidth that is a positive number greater than 0."
    );
  }

  // Button dimensions are always optional, but if they are defined, they must be
  // positive numbers greater than 0.
  if (
    options.buttonWidth &&
    (isNaN(parseFloat(options.buttonWidth)) ||
      parseFloat(options.buttonWidth) <= 0)
  ) {
    throw new Error("buttonWidth must be a positive number greater than 0.");
  }
  if (
    options.buttonHeight &&
    (isNaN(parseFloat(options.buttonHeight)) ||
      parseFloat(options.buttonHeight) <= 0)
  ) {
    throw new Error("buttonHeight must be a positive number greater than 0.");
  }

  // Only stretch-scale doesn't need an exact height.
  if (
    options.resizingMethod !== "stretch-scale" &&
    (!options.itemHeight || (options.itemHeight && options.itemHeight < 0))
  ) {
    throw new Error(
      "Carousels using a resizing method other than 'stretch-scale' require a defined itemHeight that is a positive number greater than 0."
    );
  }

  // itemSpacing is always optional, but if it is defined, it must be a positive
  // number greater than or equal to 0.
  if (options.itemSpacing && options.itemSpacing < 0) {
    throw new Error("itemSpacing must be a positive number or 0.");
  }

  // Scroll by is always optional, but if it is defined, it must be a positive
  // integer greater than 0.
  if (
    options.scrollBy &&
    (options.scrollBy < 1 || options.scrollBy % 1 !== 0)
  ) {
    throw new Error("scrollBy must be a positive integer greater than 1.");
  }

  // Number of items visible is always optional, but if it is defined, it must be
  // a positive integer greater than 0.
  if (
    options.numItemsVisible !== undefined &&
    (options.numItemsVisible < 1 || options.numItemsVisible % 1 !== 0)
  ) {
    throw new Error(
      "numItemsVisible must be a positive integer greater than 0."
    );
  }

  // Transition duration, delay, and timing function are always optional, but if
  // they are defined, they must be positive numbers greater than 0 and a non-
  // empty string, respectively.
  if (options.transitionDuration && options.transitionDuration < 0) {
    throw new Error("transitionDuration must be a positive number or 0.");
  }
  if (options.transitionDelay && options.transitionDelay < 0) {
    throw new Error("transitionDelay must be a positive number or 0.");
  }
  if (
    options.transitionTimingFunction &&
    options.transitionTimingFunction.length === 0
  ) {
    throw new Error("transitionTimingFunction must be a non-empty string.");
  }
}

/**
 * Converts some of the friendlier options to the more specific options used
 * internally by the carousel. Rather than make the user remember these details,
 * this method will just purify anything the user submits.
 * @param {CarouselOptions} options The options object to be purified.
 * @returns {void} Nothing.
 */
export function convertCarouselOptions(options: CarouselOptions): void {
  if (options.transitionDuration == 0) {
    options.transitionDuration = 1;
  }
}

export default CarouselOptions;
