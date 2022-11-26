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

const kingCrimson = new Carousel({
  carouselItemWidth: 400,
  carouselItemHeight: 400,
  carouselItemSpacing: 50,
  carouselButtonWidth: 20,
  carouselButtonHeight: 200,
  carouselItemsVisible: 1,
  carouselScrollBy: 1,
  carouselContainerId: "king-crimson",
});
