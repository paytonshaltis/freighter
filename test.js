import Freighter from "./dist/Freighter.js";

const freighter = new Freighter({
  wrappingMethod: "wrap-smart",
  resizingMethod: "stretch-scale",
  itemHeight: 1,
  itemWidth: 2,
  containerID: "carousel",
  numItemsVisible: 3,
  scrollBy: 3,
  transitionDuration: 2000,
  transitionTimingFunction: "ease-in-out",
  scrollable: true,
  buttonStyles: {
    width: "20px",
    height: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  buttonHoverStyles: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
});
