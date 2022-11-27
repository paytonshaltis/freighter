import CarouselOptions from "./CarouselOptions.type.js";

type CarouselState = CarouselOptions & {
  carouselID: number;
  allCarouselItems: HTMLElement[];
  allCarouselItemsTopPtr: number;
  allCarouselItemsBottomPtr: number;
  carouselPosition: number;
};

export default CarouselState;
