import CarouselOptions from "./CarouselOptions.type.js";

type CarouselState = CarouselOptions & {
  carouselID: number; // Handled in constructor.
  allCarouselItems: HTMLElement[]; // Handled in constructor and configureCarouselContainer().
  allCarouselItemsTopPtr: number; // Handled in constructor.
  allCarouselItemsBottomPtr: number; // Handled in constructor.
  carouselPosition: number; // Handled in constructor.
};

// Height not changing in non-visible items.
// Order of items is slightly wrong.

export default CarouselState;
