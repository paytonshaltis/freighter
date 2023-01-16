import Freighter from "./versions/es6/freighter-1.0.2.js";

const freighter = new Freighter("carousel-train", "none", "wrap-simple", {
  itemHeight: 125,
  itemWidth: 250,
  itemSpacing: 1,
  numItemsVisible: 3,
  scrollBy: 4,
  syncScrollWithVisibility: false,
  transitionDuration: 2500,
  transitionTimingFunction: "linear",
  autoScroll: true,
  scrollable: false,
  autoScrollInterval: 2500,
  autoScrollDirection: "right",
  buttonStyles: {
    width: "20px",
    height: "50%",
    backgroundColor: "rgba(161, 75, 59, 0.3)",
  },
  buttonHoverStyles: {
    width: "20px",
    height: "50%",
    backgroundColor: "rgba(161, 75, 59, 0.5)",
  },
});

// Store the initial breakpoint.
let breakpoint =
  window.innerWidth >= 965
    ? "large"
    : window.innerWidth < 965 && window.innerWidth >= 575
    ? "medium"
    : "small";

// Returns a new train engine carousel item.
const createTrainEngine = (direction = "right") => {
  const trainEngineImage = document.createElement("img");
  trainEngineImage.id = "train-engine";
  trainEngineImage.src = "./icons/train-engine.svg";

  const trainEngineDiv = document.createElement("div");
  trainEngineDiv.id = "ci-train-engine";
  trainEngineDiv.classList.add("ci-train");
  direction === "right"
    ? trainEngineDiv.classList.add("align-right")
    : trainEngineDiv.classList.add("align-center");
  trainEngineDiv.appendChild(trainEngineImage);

  return trainEngineDiv;
};

// Returns a new train car carousel item.
const createTrainCar = () => {
  const trainCarImage = document.createElement("img");
  trainCarImage.src = "./icons/train-car.svg";

  const trainCarDiv = document.createElement("div");
  trainCarDiv.classList.add("ci-train");
  trainCarDiv.appendChild(trainCarImage);

  return trainCarDiv;
};

// Returns the number of carousel items currently in the carousel.
const getItemCount = () => {
  return freighter.getCarouselState().carouselItems.length;
};

// Function that takes appropriate action to the train based on screen size.
const resizeTrain = (manual = false) => {
  if (window.innerWidth >= 965 && (breakpoint !== "large" || manual)) {
    breakpoint = "large";

    // Remove all train cars.
    while (getItemCount() > 0) {
      freighter.removeCarouselItems(0);
    }

    // Add a new train engine and two train cars.
    freighter.addCarouselItems(createTrainEngine());
    freighter.addCarouselItems(createTrainCar());
    freighter.addCarouselItems(createTrainCar());
    freighter.addCarouselItems(document.createElement("div"));

    // Increase the number of visible items to 3. No need if manual change is large.
    if (!manual) {
      freighter.setCarouselProperties({
        numItemsVisible: 3,
        scrollBy: 4,
        syncScrollWithVisibility: false,
      });
    }

    // Add the extra margin class to center container.
    document.getElementById("train-wrapper").classList.add("me-5");
  } else if (
    window.innerWidth < 965 &&
    window.innerWidth >= 575 &&
    (breakpoint !== "medium" || manual)
  ) {
    breakpoint = "medium";

    // Remove all train cars.
    while (getItemCount() > 0) {
      freighter.removeCarouselItems(0);
    }

    // Add a new train engine and one train car.
    freighter.addCarouselItems(createTrainEngine());
    freighter.addCarouselItems(createTrainCar());
    freighter.addCarouselItems(document.createElement("div"));

    // Reduce the number of visible items to 2.
    freighter.setCarouselProperties({
      numItemsVisible: 2,
      scrollBy: 3,
      syncScrollWithVisibility: false,
    });

    // Add the extra margin class to center container.
    document.getElementById("train-wrapper").classList.add("me-5");
  } else if (window.innerWidth < 575 && (breakpoint !== "small" || manual)) {
    breakpoint = "small";

    // Remove all train cars.
    while (getItemCount() > 0) {
      freighter.removeCarouselItems(0);
    }

    // Add a new train engine and a blank carousel item.
    freighter.addCarouselItems(createTrainEngine("center"));
    freighter.addCarouselItems(document.createElement("div"));

    // Reduce the number of visible items to 1, and scroll by 2.
    freighter.setCarouselProperties({
      numItemsVisible: 1,
      syncScrollWithVisibility: false,
      scrollBy: 2,
    });

    // Remove the extra margin class to center container.
    document.getElementById("train-wrapper").classList.remove("me-5");
  }
};

// Reduce the number of visible items when the screen goes below 965px.
resizeTrain(true);
window.addEventListener("resize", () => {
  resizeTrain(false);
});
