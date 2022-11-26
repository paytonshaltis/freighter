import Carousel from "./Carousel.js";

const c = new Carousel({
  carouselItemWidth: 150,
  carouselItemHeight: 75,
  carouselItemSpacing: 10,
  carouselButtonWidth: 20,
  carouselButtonHeight: 75,
  carouselItemsVisible: 4,
  carouselScrollBy: 2,
  carouselContainerId: "my-carousel",
});

const c2 = new Carousel({
  carouselItemWidth: 150,
  carouselItemHeight: 75,
  carouselItemSpacing: 10,
  carouselButtonWidth: 20,
  carouselButtonHeight: 75,
  carouselItemsVisible: 4,
  carouselScrollBy: 2,
  carouselContainerId: "second-carousel",
});
