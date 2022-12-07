import Freighter from "./dist/Freighter.js";

const freighter = new Freighter({
  wrappingMethod: "wrap-smart",
  resizingMethod: "none",
  itemHeight: 100,
  itemWidth: 200,
  containerID: "carousel",
  numItemsVisible: 3,
  scrollBy: 3,
  transitionDuration: 2500,
  transitionTimingFunction: "linear",
  scrollable: false,
  autoScroll: true,
  autoScrollInterval: 2500,
  autoScrollDirection: "right",
  buttonStyles: {
    width: "20px",
    height: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  buttonHoverStyles: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
});
