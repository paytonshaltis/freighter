/**
 * Type definition for the options object to be passed to the carousel constructor.
 */
type CarouselOptions = {
  carouselItemWidth: number;
  carouselItemHeight: number;
  carouselItemSpacing: number;
  carouselButtonWidth: number;
  carouselButtonHeight: number;
  carouselItemsVisible: number;
  carouselScrollBy: number;
  carouselContainerId: string;
  carouselTransitionDuration?: number;
  carouselTransitionDelay?: number;
  carouselTransitionTimingFunction?: string;
  resizingMethod: "none" | "stretch" | "stretch-gap" | "stretch-scale";
};

export function validateCarouselOptions(options: CarouselOptions) {
  if (options.carouselItemWidth < 0) {
    throw new Error("carouselItemWidth must be a positive number or 0.");
  }
  if (options.carouselItemHeight < 0) {
    throw new Error("carouselItemHeight must be a positive number or 0.");
  }
  if (options.carouselItemSpacing < 0) {
    throw new Error("carouselItemSpacing must be a positive number or 0.");
  }
  if (options.carouselButtonWidth < 0) {
    throw new Error("carouselButtonWidth must be a positive number or 0.");
  }
  if (options.carouselButtonHeight < 0) {
    throw new Error("carouselButtonHeight must be a positive number or 0");
  }
  if (options.carouselItemsVisible < 1) {
    throw new Error(
      "carouselItemsVisible must be a positive number greater than 1."
    );
  }
  if (options.carouselScrollBy < 1) {
    throw new Error(
      "carouselScrollBy must be a positive number greater than 1."
    );
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
}

export default CarouselOptions;
