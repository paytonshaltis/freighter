import CarouselManager from "../CarouselManager.js";

const c1 = new CarouselManager({
  carouselItemWidth: 150,
  carouselItemHeight: 75,
  carouselItemSpacing: 10,
  carouselButtonWidth: "25px",
  carouselButtonHeight: "75%",
  carouselButtonPosition: "center",
  carouselItemsVisible: 4,
  carouselScrollBy: 4,
  carouselContainerId: "carousel-1",
  resizingMethod: "stretch-scale",
  carouselTransitionDuration: 750,
  carouselTransitionDelay: 0,
  carouselTransitionTimingFunction: "ease-in-out",
  allowCarouselScrolling: true,
  carouselWrappingMethod: "none",
});

const c2 = new CarouselManager({
  carouselItemWidth: 150,
  carouselItemHeight: 75,
  carouselItemSpacing: 10,
  carouselButtonWidth: "25px",
  carouselButtonHeight: "75%",
  carouselButtonPosition: "center",
  carouselItemsVisible: 4,
  carouselScrollBy: 4,
  carouselContainerId: "carousel-2",
  resizingMethod: "stretch-scale",
  carouselTransitionDuration: 750,
  carouselTransitionDelay: 0,
  carouselTransitionTimingFunction: "ease-in-out",
  allowCarouselScrolling: true,
  carouselWrappingMethod: "wrap-simple",
});

const c3 = new CarouselManager({
  carouselItemWidth: 150,
  carouselItemHeight: 75,
  carouselItemSpacing: 10,
  carouselButtonWidth: "25px",
  carouselButtonHeight: "75%",
  carouselButtonPosition: "center",
  carouselItemsVisible: 4,
  carouselScrollBy: 4,
  carouselContainerId: "carousel-3",
  resizingMethod: "stretch-scale",
  carouselTransitionDuration: 750,
  carouselTransitionDelay: 0,
  carouselTransitionTimingFunction: "ease-in-out",
  allowCarouselScrolling: true,
  carouselWrappingMethod: "wrap-smart",
});