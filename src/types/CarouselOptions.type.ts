/**
 * Type definition for the options object to be passed to the carousel constructor.
 */
type CarouselOptions = {
  containerID: string;
  itemWidth: number;
  itemHeight: number;
  itemSpacing: number;
  buttonWidth: string;
  buttonHeight: string;
  buttonPosition: "top" | "center" | "bottom";
  numItemsVisible: number;
  scrollBy: number;
  transitionDuration?: number;
  transitionDelay?: number;
  transitionTimingFunction?: string;
  scrollable: boolean;
  autoScroll: boolean;
  autoScrollInterval: number;
  autoScrollDirection: "left" | "right";
  autoScrollPauseOnHover: boolean;
  resizingMethod: "none" | "stretch" | "stretch-gap" | "stretch-scale";
  wrappingMethod: "none" | "wrap-simple" | "wrap-smart";
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
  if (options.itemWidth < 0) {
    throw new Error("itemWidth must be a positive number or 0.");
  }
  if (options.itemHeight < 0) {
    throw new Error("itemHeight must be a positive number or 0.");
  }
  if (options.itemSpacing < 0) {
    throw new Error("itemSpacing must be a positive number or 0.");
  }
  if (
    isNaN(parseFloat(options.buttonWidth)) ||
    parseFloat(options.buttonWidth) <= 0
  ) {
    throw new Error("buttonWidth must be a positive number greater than 0.");
  }
  if (
    isNaN(parseFloat(options.buttonHeight)) ||
    parseFloat(options.buttonHeight) <= 0
  ) {
    throw new Error("buttonHeight must be a positive number greater than 0.");
  }
  if (
    options.buttonPosition !== "top" &&
    options.buttonPosition !== "center" &&
    options.buttonPosition !== "bottom"
  ) {
    throw new Error(
      "buttonPosition must be either 'top', 'center' or 'bottom'."
    );
  }
  if (options.numItemsVisible < 1 || options.numItemsVisible % 1 !== 0) {
    throw new Error(
      "numItemsVisible must be a positive integer greater than 0."
    );
  }
  if (options.scrollBy < 1 || options.scrollBy % 1 !== 0) {
    throw new Error("scrollBy must be a positive integer greater than 1.");
  }
  if (options.containerID.length === 0) {
    throw new Error("containerID must be a non-empty string.");
  }
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
  if (
    options.resizingMethod !== "none" &&
    options.resizingMethod !== "stretch" &&
    options.resizingMethod !== "stretch-gap" &&
    options.resizingMethod !== "stretch-scale"
  ) {
    throw new Error(
      "resizingMethod must be one of the following: 'none', 'stretch', 'stretch-gap', 'stretch-scale'."
    );
  }
  if (
    options.wrappingMethod !== "wrap-simple" &&
    options.wrappingMethod !== "wrap-smart" &&
    options.wrappingMethod !== "none"
  ) {
    throw new Error(
      "wrappingMethod must be one of the following: 'none', 'wrap-simple', 'wrap-smart'."
    );
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
  options.numItemsVisible = Math.floor(options.numItemsVisible);
  options.scrollBy = Math.floor(options.scrollBy);
}

export default CarouselOptions;
