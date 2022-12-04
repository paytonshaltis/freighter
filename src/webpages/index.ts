import CarouselManager from "../CarouselManager.js";

const c = new CarouselManager({
  itemWidth: 150,
  itemHeight: 75,
  itemSpacing: 10,
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
  syncScrollWithVisibility: false,
});

const c2 = new CarouselManager({
  itemWidth: 150,
  itemHeight: 75,
  itemSpacing: 10,
  numItemsVisible: 2,
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
  syncScrollWithVisibility: false,
});

const c3 = new CarouselManager({
  itemWidth: 200,
  itemHeight: 200,
  itemSpacing: 10,
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
  syncScrollWithVisibility: false,
});

const kingCrimson = new CarouselManager({
  containerID: "king-crimson",
  resizingMethod: "stretch-scale",
  itemHeight: 1,
  itemWidth: 2,
  wrappingMethod: "none",
});

kingCrimson.setCarouselProperties({
  itemHeight: 1,
  itemWidth: 1,
  itemSpacing: 25,
  numItemsVisible: 3,
  scrollBy: 3,
  transitionDuration: 1000,
  transitionDelay: 250,
  transitionTimingFunction: "cubic-bezier(0.36, 0, 0.66, -0.56)",
  scrollable: true,
  autoScroll: false,
  autoScrollInterval: 1000,
  autoScrollDirection: "right",
  autoScrollPauseOnHover: true,
  syncScrollWithVisibility: false,
  leftButtonHoverStyles: {
    backgroundColor: "red",
    color: "white",
  },
  buttonStyles: {
    height: "85px",
  },
  buttonHoverStyles: {
    color: "#0066ff",
    backgroundColor: "#0066ff",
  },
});

document.querySelector("button#b1")?.addEventListener("click", () => {
  const newItem1 = document.createElement("div");
  newItem1.innerHTML = "New Item 1";
  const newItem2 = document.createElement("div");
  newItem2.innerHTML = "New Item 2";
  kingCrimson.addCarouselItems([newItem1, newItem2]);
});

document.querySelector("button#b2")?.addEventListener("click", () => {
  kingCrimson.removeCarouselItems(0);
});

document.querySelector("button#b3")?.addEventListener("click", () => {
  kingCrimson.setCarouselProperties({
    leftButtonHoverStyles: {
      backgroundColor: "gray",
      color: "white",
    },
    buttonHoverStyles: {
      width: "35px",
      height: "100px",
      backgroundColor: "gray",
      borderBottomLeftRadius: "10px",
      borderTopLeftRadius: "10px",
    },
  });
});
