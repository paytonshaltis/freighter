import Freighter from "../versions/es6/freighter-1.0.0.js";

const demo1 = new Freighter("demo-1-carousel", "stretch-scale", "wrap-simple", {
  numItemsVisible: 3,
  itemSpacing: 10,
  itemHeight: 1,
  itemWidth: 1,
  transitionDuration: 750,
  buttonStyles: {
    height: "30%",
    width: "35px",
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    color: "rgba(0, 0, 0, 0.75)",
  },
  buttonHoverStyles: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    color: "rgba(0, 0, 0, 0.9)",
    width: "38px",
  },
});
