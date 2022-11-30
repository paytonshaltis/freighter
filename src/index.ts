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
  allowCarouselScrolling: true,
  carouselWrappingMethod: "wrap-simple",
});

const c2 = new CarouselManager({
  carouselItemWidth: 150,
  carouselItemHeight: 75,
  carouselItemSpacing: 10,
  carouselButtonWidth: "20px",
  carouselButtonHeight: "75px",
  carouselButtonPosition: "top",
  carouselItemsVisible: 4,
  carouselScrollBy: 1,
  carouselContainerId: "second-carousel",
  resizingMethod: "stretch-gap",
  carouselTransitionDelay: 0,
  carouselTransitionDuration: 1000,
  carouselTransitionTimingFunction: "linear",
  allowCarouselScrolling: true,
  carouselWrappingMethod: "none",
});

const c3 = new CarouselManager({
  carouselItemWidth: 200,
  carouselItemHeight: 200,
  carouselItemSpacing: 10,
  carouselButtonWidth: "5%",
  carouselButtonHeight: "75%",
  carouselButtonPosition: "bottom",
  carouselItemsVisible: 4,
  carouselScrollBy: 3,
  carouselContainerId: "third-carousel",
  resizingMethod: "stretch",
  carouselTransitionDuration: 1000,
  carouselTransitionDelay: 250,
  carouselTransitionTimingFunction: "cubic-bezier(0.36, 0, 0.66, -0.56)",
  allowCarouselScrolling: true,
  carouselWrappingMethod: "wrap-smart",
});

const kingCrimson = new CarouselManager({
  carouselItemWidth: 200,
  carouselItemHeight: 200,
  carouselItemSpacing: 25,
  carouselButtonWidth: "20px",
  carouselButtonHeight: "250px",
  carouselButtonPosition: "center",
  carouselItemsVisible: 5,
  carouselScrollBy: 4,
  carouselContainerId: "king-crimson",
  resizingMethod: "stretch-scale",
  carouselTransitionDuration: 500,
  carouselTransitionDelay: 0,
  carouselTransitionTimingFunction: "ease",
  allowCarouselScrolling: true,
  carouselWrappingMethod: "none",
});

document.querySelector("button#add")?.addEventListener("click", () => {
  const newItem1 = document.createElement("div");
  newItem1.innerHTML = "New Item 1";
  const newItem2 = document.createElement("div");
  newItem2.innerHTML = "New Item 2";
  kingCrimson.addCarouselItems([newItem1, newItem2]);
});

document.querySelector("button#remove")?.addEventListener("click", () => {
  kingCrimson.removeCarouselItems(2);
});

document.querySelector("button#remove-2")?.addEventListener("click", () => {
  kingCrimson.removeCarouselItems(0, 2);
});
