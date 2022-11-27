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

export default CarouselOptions;
