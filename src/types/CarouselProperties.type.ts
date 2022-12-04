import ButtonStyle from "./ButtonStyle.type";

/**
 * Type definition for the changeable properties of a Carousel.
 */
type CarouselProperties = {
  itemWidth?: number;
  itemHeight?: number;
  itemSpacing?: number;
  buttonStyles?: ButtonStyle;
  buttonHoverStyles?: ButtonStyle;
  leftButtonStyles?: ButtonStyle;
  leftButtonHoverStyles?: ButtonStyle;
  rightButtonStyles?: ButtonStyle;
  rightButtonHoverStyles?: ButtonStyle;
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

export default CarouselProperties;
