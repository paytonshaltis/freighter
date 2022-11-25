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

/**
 * SETUP CODE
 * This code runs once when the page loads, and sets up the carousel with
 * necessary event listeners and item locations (after duplicating items).
 *
 */

// Stores the current position for each carousel.
const carouselPositions: number[] = [];
for (let i = 0; i < leftArrows.length; i++) {
  carouselPositions.push(0);
}

/**
 * Returns n carousel items from either the beginning or end of the
 * carousel item container. Will loop around to the other end if necessary.
 * @param index The index of the carousel to get items from.
 * @param n The number of carousel items to be returned.
 * @param start If the items are to be taken from the start or end.
 * @returns An array of carousel items.
 */
const getNCarouselItems = (index: number, n: number, start: boolean) => {
  const carouselItems = carouselItemContainers[index].children;
  const carouselItemsLength = carouselItems.length;
  const result: HTMLElement[] = [];

  if (start) {
    for (let i = 0; i < n; i++) {
      result.push(carouselItems[i % carouselItemsLength] as HTMLElement);
    }
  } else {
    let currPos = carouselItemsLength - 1;
    for (let i = 0; i < n; i++) {
      result.push(carouselItems.item(currPos) as HTMLElement);
      currPos--;
      if (currPos < 0) {
        currPos = carouselItemsLength - 1;
      }
    }
  }
  console.log(result);
};
getNCarouselItems(0, 4, false);

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
