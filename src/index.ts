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
  resizingMethod: "none",
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
  resizingMethod: "stretch-scale",
});

const kingCrimson = new Carousel({
  carouselItemWidth: 200,
  carouselItemHeight: 200,
  carouselItemSpacing: 25,
  carouselButtonWidth: 20,
  carouselButtonHeight: 200,
  carouselItemsVisible: 3,
  carouselScrollBy: 1,
  carouselContainerId: "king-crimson",
  resizingMethod: "stretch-gap",
});
