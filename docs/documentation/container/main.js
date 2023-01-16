import Freighter from "../../versions/es6/freighter-1.0.2.js";

const freighter1 = new Freighter(
  "carousel-1",
  "stretch-populate",
  "wrap-simple",
  {
    itemWidth: 150,
    itemHeight: 150,
    itemSpacing: 10,
    numItemsVisible: 3,
    scrollBy: 2,
  }
);

const freighter2 = new Freighter(
  "carousel-2",
  "stretch-populate",
  "wrap-simple",
  {
    itemWidth: 150,
    itemHeight: 150,
    itemSpacing: 10,
    numItemsVisible: 3,
    syncScrollWithVisibility: true,
  }
);
