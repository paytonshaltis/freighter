import { validateButtonStyles } from "./ButtonStyle.type.js";
import CarouselProperties from "./CarouselProperties.type.js";

/**
 * Type definition for the options object to be passed to the carousel constructor.
 */
type CarouselOptions = CarouselProperties & {
  containerID: string;
  resizingMethod?:
    | "none"
    | "stretch"
    | "stretch-gap"
    | "stretch-scale"
    | "stretch-populate";
  wrappingMethod?: "none" | "wrap-simple" | "wrap-smart";
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
  if (!options.containerID || options.containerID.length === 0) {
    throw new Error("containerID must be a non-empty string.");
  }

  // Resizing method must be one of the following: 'none', 'stretch', 'stretch-gap', 'stretch-scale', 'stretch-populate'.
  if (
    options.resizingMethod &&
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

  // Wrapping method must be one of the following: 'none', 'wrap-simple', 'wrap-smart'.
  if (
    options.wrappingMethod &&
    options.wrappingMethod !== "wrap-simple" &&
    options.wrappingMethod !== "wrap-smart" &&
    options.wrappingMethod !== "none"
  ) {
    throw new Error(
      "wrappingMethod must be one of the following: 'none', 'wrap-simple', 'wrap-smart'."
    );
  }

  // itemSpacing is always optional, but if it is defined, it must be a positive
  // number greater than or equal to 0.
  if (options.itemSpacing !== undefined && options.itemSpacing < 0) {
    throw new Error("itemSpacing must be a positive number or 0.");
  }

  // Scroll by is always optional, but if it is defined, it must be a positive
  // integer greater than 0.
  if (
    options.scrollBy !== undefined &&
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
  if (
    options.transitionDuration !== undefined &&
    options.transitionDuration < 0
  ) {
    throw new Error("transitionDuration must be a positive number or 0.");
  }
  if (options.transitionDelay != undefined && options.transitionDelay < 0) {
    throw new Error("transitionDelay must be a positive number or 0.");
  }
  if (
    options.transitionTimingFunction != undefined &&
    options.transitionTimingFunction.length === 0
  ) {
    throw new Error("transitionTimingFunction must be a non-empty string.");
  }

  // Need to validate the ButtonStyle objects.
  validateButtonStyles(options.buttonStyles);
  validateButtonStyles(options.buttonHoverStyles);
  validateButtonStyles(options.leftButtonStyles);
  validateButtonStyles(options.leftButtonHoverStyles);
  validateButtonStyles(options.rightButtonStyles);
  validateButtonStyles(options.rightButtonHoverStyles);
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
