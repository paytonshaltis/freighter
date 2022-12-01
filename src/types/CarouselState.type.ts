import CarouselOptions from "./CarouselOptions.type.js";

type CarouselState = CarouselOptions & {
  carouselID: number;
  carouselItems: HTMLElement[];
  leftCarouselPointer: number;
};

export default CarouselState;
