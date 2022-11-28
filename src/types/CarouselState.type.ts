import CarouselOptions from "./CarouselOptions.type.js";

type CarouselState = CarouselOptions & {
  carouselID: number;
  allCarouselItems: HTMLElement[];
  allCarouselItemsBottomPtr: number;
};

// Order of items is slightly wrong.

export default CarouselState;
