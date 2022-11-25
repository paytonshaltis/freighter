// Store important elements for event handlers.
const leftArrows = document.querySelectorAll("button.carousel-button.left");
const rightArrows = document.querySelectorAll("button.carousel-button.right");
const carouselItemContainers = document.querySelectorAll(
  "div.carousel-item-container"
);

// Ensure that all references to elements are not null.
if (!(leftArrows && rightArrows && carouselItemContainers)) {
  throw new Error("Could not find required elements in document.");
}

// Store important CSS variables for transformations.
const carouselItemWidth = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue(
    "--carousel-item-width"
  )
);
const carouselItemSpacing = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue(
    "--carousel-item-spacing"
  )
);
const carouselItemsVisible = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue(
    "--carousel-items-visible"
  )
);
const carouselScrollBy = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue(
    "--carousel-scroll-by"
  )
);

// Stores the current position for each carousel.
const carouselPositions: number[] = [0, 0];
// for (let i = 0; i < leftArrows.length; i++) {
//   carouselPositions.push(0);
// }

// Click event listener for all left carousel arrow.
Array.from(leftArrows).forEach((leftArrow, index) => {
  leftArrow.addEventListener("click", () => {
    carouselPositions[index] -= 1;
    transformCarouselItems(index);
  });
});

// Click event listener for all right carousel arrow.
Array.from(rightArrows).forEach((rightArrow, index) => {
  rightArrow.addEventListener("click", () => {
    carouselPositions[index] += 1;
    transformCarouselItems(index);
  });
});

// Transform the carousel items based on the position array.
const transformCarouselItems = (index: number) => {
  (
    carouselItemContainers[index] as HTMLElement
  ).style.transform = `translateX(${
    -1 *
    carouselPositions[index] *
    ((carouselItemWidth + carouselItemSpacing) * carouselScrollBy)
  }px)`;
};
