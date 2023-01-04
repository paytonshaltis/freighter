import Freighter from "../../../dist/FreighterES6.js";

const freighter0 = new Freighter("carousel-0", "none", "none", {});

const freighter1 = new Freighter("carousel-1", "none", "none", {});

const freighter2 = new Freighter("carousel-2", "none", "none", {});

const freighter3 = new Freighter("carousel-3", "stretch-scale", "wrap-simple", {
  numItemsVisible: 3,
  scrollBy: 2,
  autoScroll: true,
});

const freighter4 = new Freighter("carousel-4", "stretch-scale", "wrap-simple", {
  numItemsVisible: 3,
  scrollBy: 2,
  itemSpacing: 10,
  itemHeight: 3,
  itemWidth: 2,
});

const freighter5 = new Freighter("carousel-5", "stretch-scale", "wrap-simple", {
  numItemsVisible: 3,
  scrollBy: 2,
  itemSpacing: 20,
  buttonStyles: {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    color: "orange",
  },
  buttonHoverStyles: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    height: "90%",
  },
  rightButtonStyles: {
    color: "blue",
  },
});

const freighter6 = new Freighter(
  "carousel-6",
  "stretch-populate",
  "wrap-simple",
  {
    numItemsVisible: 3,
    scrollBy: 1,
    syncScrollWithVisibility: true,
    itemSpacing: 20,
    buttonStyles: {
      backgroundColor: "rgba(120, 120, 120, 0.75)",
      color: "rgba(255, 0, 0, 0.5)",
    },
    buttonHoverStyles: {
      backgroundColor: "rgba(120, 120, 120, 0.9)",
      color: "rgba(255, 0, 0, 0.9)",
      width: "30px",
    },
  }
);

const freighter7 = new Freighter("carousel-7", "stretch", "wrap-smart", {
  itemWidth: 150,
  itemHeight: 150,
  numItemsVisible: 2,
  scrollBy: 2,
  itemSpacing: 10,
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
  ).innerHTML = `Add Item (${newItemCounter} Total)`;
});

document
  .querySelector("button#get-properties")
  .addEventListener("click", () => {
    console.log(freighter6.getCarouselState());
  });

document.getElementById("visible-items-3").addEventListener("click", () => {
  freighter7.setCarouselProperties({ numItemsVisible: 3 });
});

document
  .getElementById("transition-duration-1000")
  .addEventListener("click", () => {
    freighter7.setCarouselProperties({ transitionDuration: 1000 });
  });

document.getElementById("blue-right-button").addEventListener("click", () => {
  freighter7.setCarouselProperties({
    rightButtonStyles: { backgroundColor: "rgba(0, 0, 255, 0.5)" },
    rightButtonHoverStyles: { backgroundColor: "rgba(0, 0, 255, 0.9)" },
  });
});
