import Freighter from "../../../dist/FreighterES6.js";

const freighter1 = new Freighter({
  containerID: "carousel-1",
  resizingMethod: "stretch-scale",
  numItemsVisible: 3,
  scrollBy: 2,
  itemSpacing: 20,
  itemHeight: 2,
  itemWidth: 3,
});

const freighter2 = new Freighter({
  containerID: "carousel-2",
  resizingMethod: "stretch-scale",
  wrappingMethod: "wrap-simple",
  numItemsVisible: 3,
  scrollBy: 2,
  itemSpacing: 20,
  itemHeight: 2,
  itemWidth: 3,
});
