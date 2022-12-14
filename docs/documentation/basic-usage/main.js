import Freighter from "../../../dist/FreighterES6.js";

const freighter0 = new Freighter({
  containerID: "carousel-0",
});

const freighter1 = new Freighter({
  containerID: "carousel-1",
});

const freighter2 = new Freighter({
  containerID: "carousel-2",
});

const freighter3 = new Freighter({
  containerID: "carousel-3",
  resizingMethod: "stretch-scale",
  wrappingMethod: "wrap-simple",
  numItemsVisible: 3,
  scrollBy: 2,
  autoScroll: true,
});

const freighter4 = new Freighter({
  containerID: "carousel-4",
  resizingMethod: "stretch-scale",
  wrappingMethod: "wrap-simple",
  numItemsVisible: 3,
  scrollBy: 2,
  itemSpacing: 10,
  itemHeight: 3,
  itemWidth: 2,
});

let newItemCounter = 1;
function getNewElement() {
  const newElement = document.createElement("div");
  newElement.classList.add("ci");
  newElement.innerHTML = `<p style="font-size: 4rem;">${++newItemCounter}</p>`;
  return newElement;
}

document.querySelector("button#add-item").addEventListener("click", () => {
  freighter2.addCarouselItems(getNewElement());
  document.querySelector(
    "button#add-item"
  ).innerHTML = `Add Item (${newItemCounter}) Total`;
});
