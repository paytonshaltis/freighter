import Freighter from "../../../dist/FreighterES6.js";

const freighter1 = new Freighter("carousel-1", "stretch-scale", "none", {
  numItemsVisible: 3,
  scrollBy: 3,
  itemSpacing: 15,
});

const freighter2 = new Freighter("carousel-2", "stretch-scale", "none", {
  numItemsVisible: 3,
  scrollBy: 4,
  itemSpacing: 15,
});

const freighter3 = new Freighter("carousel-3", "stretch-scale", "none", {
  numItemsVisible: 3,
  scrollBy: 3,
  itemSpacing: 15,
});

const freighter4 = new Freighter("carousel-4", "stretch-scale", "none", {
  numItemsVisible: 3,
  scrollBy: 3,
  itemSpacing: 15,
});

const freighter5 = new Freighter("carousel-5", "stretch-scale", "none", {
  numItemsVisible: 3,
  scrollBy: 3,
  itemSpacing: 15,
});

// Remove last two items from carousel.
document.getElementById("remove-last-two").addEventListener("click", () => {
  if (freighter4.getCarouselState().carouselItems.length < 2) {
    return;
  }
  freighter4.removeCarouselItems(length - 2, 2);
  if (freighter4.getCarouselState().carouselItems.length < 2) {
    document.getElementById("remove-last-two").classList.add("disabled");
  }
});

// Reset the items in the carousel above.
document.getElementById("reset-last-removals").addEventListener("click", () => {
  while (freighter4.getCarouselState().carouselItems.length < 9) {
    const item = document.createElement("div");
    item.classList.add("ci");
    item.innerHTML = `<p>${
      freighter4.getCarouselState().carouselItems.length + 1
    }</p>`;
    freighter4.addCarouselItems(item);
  }
  document.getElementById("remove-last-two").classList.remove("disabled");
});

// Remove first two items from carousel.
document.getElementById("remove-first-two").addEventListener("click", () => {
  if (freighter5.getCarouselState().carouselItems.length < 2) {
    return;
  }
  freighter5.removeCarouselItems(0, 2);
  if (freighter5.getCarouselState().carouselItems.length < 2) {
    document.getElementById("remove-first-two").classList.add("disabled");
  }
});

// Reset the items in the carousel above.
document
  .getElementById("reset-first-removals")
  .addEventListener("click", () => {
    while (freighter5.getCarouselState().carouselItems.length < 9) {
      const item = document.createElement("div");
      item.classList.add("ci");
      item.innerHTML = `<p>${
        9 - freighter5.getCarouselState().carouselItems.length
      }</p>`;
      freighter5.addCarouselItems(item, 0);
    }
    document.getElementById("remove-first-two").classList.remove("disabled");
  });
