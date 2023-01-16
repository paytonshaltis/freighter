import Freighter from "../../versions/es6/freighter-1.0.2.js";

const freighter1 = new Freighter("carousel-1", "stretch-scale", "wrap-simple", {
  numItemsVisible: 3,
  itemSpacing: 10,
});

const freighter2 = new Freighter("carousel-2", "stretch-scale", "none", {
  numItemsVisible: 2,
  scrollBy: 1,
  itemSpacing: 15,
  transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, -5)",
  transitionDuration: 1500,
});

const freighter3 = new Freighter("carousel-3", "stretch-scale", "wrap-simple", {
  numItemsVisible: 5,
  itemSpacing: 15,
});

const freighter4 = new Freighter("carousel-4", "stretch-scale", "wrap-smart", {
  numItemsVisible: 5,
  itemSpacing: 15,
});

const freighter5 = new Freighter("carousel-5", "stretch-scale", "wrap-smart", {
  numItemsVisible: 4,
  itemSpacing: 15,
});

const removeButton = document.getElementById("remove-item");
removeButton.addEventListener("click", () => {
  freighter5.removeCarouselItems(3);
  removeButton.classList.add("disabled");
  removeButton.innerHTML = "Check console!";
});
