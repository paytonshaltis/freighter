import Freighter from "../../../dist/FreighterES6.js";

const freighter1 = new Freighter(
  "carousel-1",
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

const freighter2 = new Freighter("carousel-2", "stretch", "wrap-smart", {
  itemWidth: 150,
  itemHeight: 150,
  numItemsVisible: 2,
  scrollBy: 2,
  itemSpacing: 10,
});

document
  .querySelector("button#get-properties")
  .addEventListener("click", () => {
    console.log("Carousel State:", freighter1.getCarouselState());
    document.querySelector("button#get-properties").classList.add("disabled");
    document.querySelector("button#get-properties").innerHTML =
      "Check console!";
  });

document.getElementById("visible-items-3").addEventListener("click", () => {
  freighter2.setCarouselProperties({ numItemsVisible: 3 });
});

document
  .getElementById("transition-duration-1000")
  .addEventListener("click", () => {
    freighter2.setCarouselProperties({ transitionDuration: 1000 });
  });

document.getElementById("blue-right-button").addEventListener("click", () => {
  freighter2.setCarouselProperties({
    rightButtonStyles: { backgroundColor: "rgba(0, 0, 255, 0.5)" },
    rightButtonHoverStyles: { backgroundColor: "rgba(0, 0, 255, 0.9)" },
  });
});
