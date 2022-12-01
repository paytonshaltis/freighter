import CarouselManager from "../CarouselManager.js";

const c = new CarouselManager({
  itemWidth: 150,
  itemHeight: 75,
  itemSpacing: 10,
  buttonWidth: "5vw",
  buttonHeight: "75%",
  buttonPosition: "top",
  numItemsVisible: 1,
  scrollBy: 2.0,
  containerID: "my-carousel",
  resizingMethod: "none",
  transitionDuration: 0,
  transitionDelay: 0,
  transitionTimingFunction: "cubic-bezier(0.36, 0, 0.66, -2.56)",
  scrollable: true,
  wrappingMethod: "wrap-simple",
  autoScroll: true,
  autoScrollInterval: 1000,
  autoScrollDirection: "right",
  autoScrollPauseOnHover: true,
});

const c2 = new CarouselManager({
  itemWidth: 150,
  itemHeight: 75,
  itemSpacing: 10,
  buttonWidth: "20px",
  buttonHeight: "75px",
  buttonPosition: "top",
  numItemsVisible: 4,
  scrollBy: 1,
  containerID: "second-carousel",
  resizingMethod: "stretch-gap",
  transitionDelay: 0,
  transitionDuration: 1000,
  transitionTimingFunction: "linear",
  scrollable: true,
  wrappingMethod: "none",
  autoScroll: true,
  autoScrollInterval: 1000,
  autoScrollDirection: "right",
  autoScrollPauseOnHover: true,
});

const c3 = new CarouselManager({
  itemWidth: 200,
  itemHeight: 200,
  itemSpacing: 10,
  buttonWidth: "5%",
  buttonHeight: "75%",
  buttonPosition: "bottom",
  numItemsVisible: 4,
  scrollBy: 3,
  containerID: "third-carousel",
  resizingMethod: "stretch",
  transitionDuration: 1000,
  transitionDelay: 250,
  transitionTimingFunction: "cubic-bezier(0.36, 0, 0.66, -0.56)",
  scrollable: true,
  wrappingMethod: "wrap-smart",
  autoScroll: true,
  autoScrollInterval: 1000,
  autoScrollDirection: "right",
  autoScrollPauseOnHover: true,
});

const kingCrimson = new CarouselManager({
  itemWidth: 200,
  itemHeight: 200,
  itemSpacing: 25,
  buttonWidth: "20px",
  buttonHeight: "250px",
  buttonPosition: "center",
  numItemsVisible: 5,
  scrollBy: 4,
  containerID: "king-crimson",
  resizingMethod: "stretch-scale",
  transitionDuration: 500,
  transitionDelay: 0,
  transitionTimingFunction: "ease",
  scrollable: true,
  wrappingMethod: "none",
  autoScroll: true,
  autoScrollInterval: 1000,
  autoScrollDirection: "right",
  autoScrollPauseOnHover: true,
});

document.querySelector("button#b1")?.addEventListener("click", () => {
  const newItem1 = document.createElement("div");
  newItem1.innerHTML = "New Item 1";
  const newItem2 = document.createElement("div");
  newItem2.innerHTML = "New Item 2";
  kingCrimson.addCarouselItems([newItem1, newItem2]);
});

document.querySelector("button#b2")?.addEventListener("click", () => {
  kingCrimson.removeCarouselItems(2);
});
