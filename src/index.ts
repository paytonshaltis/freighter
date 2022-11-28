import Carousel from "./Carousel.js";
import CarouselManager from "./CarouselManager.js";

const c = new CarouselManager({
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

const c2 = new CarouselManager({
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
  carouselTransitionDelay: 0,
  carouselTransitionDuration: 1000,
  carouselTransitionTimingFunction: "linear",
});

const c3 = new CarouselManager({
  carouselItemWidth: 200,
  carouselItemHeight: 200,
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

const kingCrimson = new CarouselManager({
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

(document.querySelector("button#forwards") as HTMLElement).addEventListener(
  "click",
  () => {
    c3.changeCarouselOptions({
      carouselItemHeight: 100,
      carouselItemWidth: 100,
      carouselItemSpacing: 1,
      carouselItemsVisible: 9,
      resizingMethod: "stretch-scale",
      carouselScrollBy: 5,
      carouselButtonHeight: "100px",
    });
    kingCrimson.changeCarouselOptions({
      carouselItemsVisible: 2,
      carouselButtonHeight: "35%",
      resizingMethod: "stretch-gap",
    });
  }
);

(document.querySelector("button#backwards") as HTMLElement).addEventListener(
  "click",
  () => {
    c3.changeCarouselOptions({
      carouselItemHeight: 100,
      carouselItemWidth: 100,
      carouselItemSpacing: 1,
      carouselItemsVisible: 6,
      resizingMethod: "stretch-scale",
      carouselScrollBy: 3,
      carouselButtonHeight: "100px",
    });
    kingCrimson.changeCarouselOptions({
      carouselItemsVisible: 8,
      resizingMethod: "stretch-gap",
      carouselButtonPosition: "top",
      carouselButtonWidth: "40px",
      carouselItemHeight: 40,
      carouselItemWidth: 40,
      carouselItemSpacing: 50,
    });
  }
);
