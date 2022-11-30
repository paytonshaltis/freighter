import CarouselManager from "../CarouselManager.js";

const c1 = new CarouselManager({
  itemWidth: 150,
  itemHeight: 75,
  itemSpacing: 10,
  buttonWidth: "25px",
  buttonHeight: "75%",
  buttonPosition: "center",
  numItemsVisible: 4,
  scrollBy: 4,
  containerID: "carousel-1",
  resizingMethod: "stretch-scale",
  transitionDuration: 750,
  transitionDelay: 0,
  transitionTimingFunction: "ease-in-out",
  scrollable: true,
  wrappingMethod: "none",
});

const c2 = new CarouselManager({
  itemWidth: 150,
  itemHeight: 75,
  itemSpacing: 10,
  buttonWidth: "25px",
  buttonHeight: "75%",
  buttonPosition: "center",
  numItemsVisible: 4,
  scrollBy: 4,
  containerID: "carousel-2",
  resizingMethod: "stretch-scale",
  transitionDuration: 750,
  transitionDelay: 0,
  transitionTimingFunction: "ease-in-out",
  scrollable: true,
  wrappingMethod: "wrap-simple",
});

const c3 = new CarouselManager({
  itemWidth: 150,
  itemHeight: 75,
  itemSpacing: 10,
  buttonWidth: "25px",
  buttonHeight: "75%",
  buttonPosition: "center",
  numItemsVisible: 4,
  scrollBy: 4,
  containerID: "carousel-3",
  resizingMethod: "stretch-scale",
  transitionDuration: 750,
  transitionDelay: 0,
  transitionTimingFunction: "ease-in-out",
  scrollable: true,
  wrappingMethod: "wrap-smart",
});

let index: number = 0;
let amount: number = 0;
let carouselNumber: number = 1;
(document.getElementById("index") as HTMLElement).onchange = () => {
  index = parseInt(
    (document.getElementById("index") as HTMLInputElement).value
  );
};
(document.getElementById("amount") as HTMLElement).onchange = () => {
  amount = parseInt(
    (document.getElementById("amount") as HTMLInputElement).value
  );
};
(document.getElementById("carousel-number") as HTMLElement).onchange = () => {
  carouselNumber = parseInt(
    (document.getElementById("carousel-number") as HTMLInputElement).value
  );
};
(document.getElementById("add") as HTMLElement).onclick = () => {
  let carousel;
  switch (carouselNumber) {
    case 1:
      carousel = c1;
      break;
    case 2:
      carousel = c2;
      break;
    case 3:
      carousel = c3;
      break;
  }
  console.log("Adding " + amount + " items to index " + index);
  for (let i = 0; i < amount; i++) {
    let div = document.createElement("div");
    div.innerHTML = "New Item " + (index + i);
    carousel?.addCarouselItem(div, index);
  }
};
(document.getElementById("remove") as HTMLElement).onclick = () => {
  let carousel;
  switch (carouselNumber) {
    case 1:
      carousel = c1;
      break;
    case 2:
      carousel = c2;
      break;
    case 3:
      carousel = c3;
      break;
  }
  console.log("Removing " + amount + " items from index " + index);
  carousel?.removeCarouselItems(index, amount);
};
