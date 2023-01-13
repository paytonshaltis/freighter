import Freighter from "../../versions/1.0.0/es6/freighter-1.0.0.js";

const freighter1 = new Freighter("carousel-1", "stretch-scale", "none", {
  numItemsVisible: 2,
  scrollBy: 2,
  itemSpacing: 30,
  leftButtonStyles: {
    position: "top",
    borderTopLeftRadius: "10px",
  },
  rightButtonStyles: {
    position: "bottom",
    borderBottomRightRadius: "10px",
  },
});
