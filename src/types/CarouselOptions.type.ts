/**
 * Type definition for the options object to be passed to the carousel constructor.
 */
type CarouselOptions = {
  carouselItemWidth: number;
  carouselItemHeight: number;
  carouselItemSpacing: number;
  carouselButtonWidth: string;
  carouselButtonHeight: string;
  carouselButtonPosition: "top" | "center" | "bottom";
  carouselItemsVisible: number;
  carouselScrollBy: number;
  carouselContainerId: string;
  carouselTransitionDuration?: number;
  carouselTransitionDelay?: number;
  carouselTransitionTimingFunction?: string;
  resizingMethod: "none" | "stretch" | "stretch-gap" | "stretch-scale";
  allowCarouselScrolling: boolean;
  carouselWrappingMethod: "none" | "wrap-jump" | "wrap-simple" | "wrap-smart";
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
  if (options.carouselItemWidth < 0) {
    throw new Error("carouselItemWidth must be a positive number or 0.");
  }
  if (options.carouselItemHeight < 0) {
    throw new Error("carouselItemHeight must be a positive number or 0.");
  }
  if (options.carouselItemSpacing < 0) {
    throw new Error("carouselItemSpacing must be a positive number or 0.");
  }
  if (
    isNaN(parseFloat(options.carouselButtonWidth)) ||
    parseFloat(options.carouselButtonWidth) < 0
  ) {
    throw new Error("carouselButtonWidth must be a positive number or 0.");
  }
  if (
    isNaN(parseFloat(options.carouselButtonHeight)) ||
    parseFloat(options.carouselButtonHeight) < 0
  ) {
    throw new Error("carouselButtonHeight must be a positive number or 0");
  }
  if (
    options.carouselButtonPosition !== "top" &&
    options.carouselButtonPosition !== "center" &&
    options.carouselButtonPosition !== "bottom"
  ) {
    throw new Error(
      "buttonPosition must be either 'top', 'center' or 'bottom'."
    );
  }
  if (options.carouselItemsVisible < 1) {
    throw new Error(
      "carouselItemsVisible must be a positive number greater than 1."
    );
  }
  if (options.carouselItemsVisible % 1 !== 0) {
    throw new Error("carouselItemsVisible must be an integer.");
  }
  if (options.carouselScrollBy < 1) {
    throw new Error(
      "carouselScrollBy must be a positive number greater than 1."
    );
  }
  if (options.carouselScrollBy % 1 !== 0) {
    throw new Error("carouselScrollBy must be an integer.");
  }
  if (options.carouselContainerId.length === 0) {
    throw new Error("carouselContainerId must be a non-empty string.");
  }
  if (
    options.carouselTransitionDuration &&
    options.carouselTransitionDuration < 0
  ) {
    throw new Error(
      "carouselTransitionDuration must be a positive number or 0."
    );
  }
  if (options.carouselTransitionDelay && options.carouselTransitionDelay < 0) {
    throw new Error("carouselTransitionDelay must be a positive number or 0.");
  }
  if (
    options.carouselTransitionTimingFunction &&
    options.carouselTransitionTimingFunction.length === 0
  ) {
    throw new Error(
      "carouselTransitionTimingFunction must be a non-empty string."
    );
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
    options.carouselWrappingMethod !== "wrap-simple" &&
    options.carouselWrappingMethod !== "wrap-smart"
  ) {
    throw new Error(
      "carouselWrappingMethod must be one of the following: 'wrap-simple', 'wrap-smart'."
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
  if (options.carouselTransitionDuration == 0) {
    options.carouselTransitionDuration = 1;
  }
  options.carouselItemsVisible = Math.floor(options.carouselItemsVisible);
  options.carouselScrollBy = Math.floor(options.carouselScrollBy);
}

export default CarouselOptions;
