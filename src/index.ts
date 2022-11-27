import Carousel from "./Carousel.js";

const c = new Carousel({
  carouselItemWidth: 150,
  carouselItemHeight: 75,
  carouselItemSpacing: 10,
  carouselButtonWidth: "5vw",
  carouselButtonHeight: "75%",
  carouselButtonPosition: "top",
  carouselItemsVisible: 1,
  carouselScrollBy: 2.0,
  carouselContainerId: "my-carousel",
  resizingMethod: "none",
  carouselTransitionDuration: 0,
  carouselTransitionDelay: 0,
  carouselTransitionTimingFunction: "cubic-bezier(0.36, 0, 0.66, -2.56)",
});

const c2 = new Carousel({
  carouselItemWidth: 150,
  carouselItemHeight: 75,
  carouselItemSpacing: 10,
  carouselButtonWidth: "20px",
  carouselButtonHeight: "75px",
  carouselButtonPosition: "top",
  carouselItemsVisible: 4,
  carouselScrollBy: 2,
  carouselContainerId: "second-carousel",
  resizingMethod: "stretch-gap",
});

const c3 = new Carousel({
  carouselItemWidth: 150,
  carouselItemHeight: 75,
  carouselItemSpacing: 10,
  carouselButtonWidth: "5%",
  carouselButtonHeight: "75%",
  carouselButtonPosition: "bottom",
  carouselItemsVisible: 4,
  carouselScrollBy: 2,
  carouselContainerId: "third-carousel",
  resizingMethod: "stretch",
  carouselTransitionDuration: 1000,
  carouselTransitionDelay: 250,
  carouselTransitionTimingFunction: "cubic-bezier(0.36, 0, 0.66, -0.56)",
});

const kingCrimson = new Carousel({
  carouselItemWidth: 200,
  carouselItemHeight: 200,
  carouselItemSpacing: 25,
  carouselButtonWidth: "20px",
  carouselButtonHeight: "250px",
  carouselButtonPosition: "center",
  carouselItemsVisible: 3,
  carouselScrollBy: 2,
  carouselContainerId: "king-crimson",
  resizingMethod: "stretch-scale",
  carouselTransitionDuration: 1000,
  carouselTransitionDelay: 250,
  carouselTransitionTimingFunction: "cubic-bezier(0.36, 0, 0.66, -2.56)",
});
