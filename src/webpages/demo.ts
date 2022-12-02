import CarouselManager from "../CarouselManager.js";

const c1 = new CarouselManager({
  itemWidth: 150,
  itemHeight: 75,
  itemSpacing: 10,
  buttonWidth: "25px",
  buttonHeight: "75%",
  buttonPosition: "center",
  numItemsVisible: 3,
  scrollBy: 4,
  containerID: "carousel-1",
  resizingMethod: "stretch-populate",
  transitionDuration: 750,
  transitionDelay: 0,
  transitionTimingFunction: "ease-in-out",
  scrollable: true,
  wrappingMethod: "none",
  autoScroll: false,
  autoScrollInterval: 300,
  autoScrollDirection: "right",
  autoScrollPauseOnHover: true,
});

const c2 = new CarouselManager({
  itemWidth: 150,
  itemHeight: 75,
  itemSpacing: 10,
  buttonWidth: "25px",
  buttonHeight: "75%",
  buttonPosition: "center",
  numItemsVisible: 3,
  scrollBy: 4,
  containerID: "carousel-2",
  resizingMethod: "stretch-populate",
  transitionDuration: 750,
  transitionDelay: 0,
  transitionTimingFunction: "ease-in-out",
  scrollable: true,
  wrappingMethod: "wrap-simple",
  autoScroll: false,
  autoScrollInterval: 600,
  autoScrollDirection: "left",
  autoScrollPauseOnHover: true,
});

const c3 = new CarouselManager({
  itemWidth: 150,
  itemHeight: 75,
  itemSpacing: 10,
  buttonWidth: "25px",
  buttonHeight: "75%",
  buttonPosition: "center",
  numItemsVisible: 2,
  scrollBy: 2,
  containerID: "carousel-3",
  resizingMethod: "stretch-populate",
  transitionDuration: 1000,
  transitionDelay: 0,
  transitionTimingFunction: "ease-in-out",
  scrollable: true,
  wrappingMethod: "wrap-smart",
  autoScroll: true,
  autoScrollInterval: 5000,
  autoScrollDirection: "right",
  autoScrollPauseOnHover: true,
});

let index: number = 8;
let amount: number = 2;
let carouselNumber: number = 3;
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
