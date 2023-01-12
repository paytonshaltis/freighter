import Freighter from "../../../dist/FreighterES6.js";

const freighter1 = new Freighter("carousel-1", "none", "none", {
  numItemsVisible: 5,
  itemWidth: 100,
  itemHeight: 100,
  itemSpacing: 5,
  scrollBy: 2,
});

const freighter2 = new Freighter("carousel-2", "stretch", "none", {
  numItemsVisible: 3,
  scrollBy: 3,
  itemHeight: 150,
  itemSpacing: 10,
});

const freighter3 = new Freighter("carousel-3", "stretch-gap", "none", {
  numItemsVisible: 3,
  scrollBy: 3,
  itemHeight: 150,
  itemWidth: 175,
  itemSpacing: 10,
});

const freighter4 = new Freighter("carousel-4", "stretch-scale", "none", {
  numItemsVisible: 3,
  scrollBy: 3,
  itemHeight: 2,
  itemWidth: 3,
  itemSpacing: 10,
});

const freighter5 = new Freighter("carousel-5", "stretch-populate", "none", {
  numItemsVisible: 2,
  scrollBy: 3,
  itemHeight: 150,
  itemWidth: 175,
  itemSpacing: 10,
});
