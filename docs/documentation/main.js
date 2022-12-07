import Freighter from "../../dist/Freighter.js";

const freighter = new Freighter({
  containerID: "carousel-1",
  resizingMethod: "stretch-scale",
  wrappingMethod: "none",
  numItemsVisible: 2,
  scrollBy: 2,
  itemSpacing: 20,
  itemHeight: 2,
  itemWidth: 3,
});
