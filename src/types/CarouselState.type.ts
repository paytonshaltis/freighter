import ButtonStyle, { equalButtonStyles } from "./ButtonStyle.type.js";
import CarouselOptions from "./CarouselOptions.type.js";

type CarouselState = CarouselOptions & {
  carouselID: number;
  carouselItems: HTMLElement[];
  leftCarouselPointer: number;
  carouselContainer: HTMLElement;
};

/**
 * Performs a deep equality check on two CarouselState objects. Returns true if they
 * are equal and false otherwise.
 * @param {CarouselState} state1 The first state object to compare.
 * @param {CarouselState} state2 The second state object to compare.
 * @returns {boolean} True if the two state objects are equal, false otherwise.
 */
export function equalStates(
  state1: CarouselState,
  state2: CarouselState
): boolean {
  return (
    state1.containerID === state2.containerID &&
    state1.itemWidth === state2.itemWidth &&
    state1.itemHeight === state2.itemHeight &&
    state1.itemSpacing === state2.itemSpacing &&
    state1.numItemsVisible === state2.numItemsVisible &&
    state1.scrollBy === state2.scrollBy &&
    state1.transitionDuration === state2.transitionDuration &&
    state1.transitionDelay === state2.transitionDelay &&
    state1.transitionTimingFunction === state2.transitionTimingFunction &&
    state1.scrollable === state2.scrollable &&
    state1.autoScroll === state2.autoScroll &&
    state1.autoScrollInterval === state2.autoScrollInterval &&
    state1.autoScrollDirection === state2.autoScrollDirection &&
    state1.autoScrollPauseOnHover === state2.autoScrollPauseOnHover &&
    state1.syncScrollWithVisibility === state2.syncScrollWithVisibility &&
    state1.resizingMethod === state2.resizingMethod &&
    state1.wrappingMethod === state2.wrappingMethod &&
    // Need to check for equivalence of all 6 ButtonStyle objects.
    equalButtonStyles(
      state1.buttonStyles as ButtonStyle,
      state2.buttonStyles as ButtonStyle
    ) &&
    equalButtonStyles(
      state1.buttonHoverStyles as ButtonStyle,
      state2.buttonHoverStyles as ButtonStyle
    ) &&
    equalButtonStyles(
      state1.leftButtonStyles as ButtonStyle,
      state2.leftButtonStyles as ButtonStyle
    ) &&
    equalButtonStyles(
      state1.leftButtonHoverStyles as ButtonStyle,
      state2.leftButtonHoverStyles as ButtonStyle
    ) &&
    equalButtonStyles(
      state1.rightButtonStyles as ButtonStyle,
      state2.rightButtonStyles as ButtonStyle
    ) &&
    equalButtonStyles(
      state1.rightButtonHoverStyles as ButtonStyle,
      state2.rightButtonHoverStyles as ButtonStyle
    ) &&
    // Referential equality is sufficient for this property, since the
    // carouseItems array, when adding or removing items, is always replaced
    // with a new array.
    state1.carouselItems === state2.carouselItems
  );
}

export default CarouselState;
