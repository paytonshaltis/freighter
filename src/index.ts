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
 */

/**
 * Returns n carousel items from the starting index provided.
 * carousel item container. Will loop around to the other end if necessary.
 * @param index The index of the carousel to get items from.
 * @param n The number of carousel items to be returned.
 * @param start The index to start getting items from.
 * @param deep Optional parameter to get all contents of the item.
 * @returns An array of carousel items.
 */
const getNCarouselItems = (
  index: number,
  n: number,
  start: number,
  deep: boolean = true
) => {
  const carouselItemsLength = allCarouselItems[index].length;
  const result: HTMLElement[] = [];

  // If the starting index is negative, wrap around to the other end.
  if (start < 0) {
    start = carouselItemsLength + start;
  }

  // Start at the start index and get n items.
  for (let i = start; i < start + n; i++) {
    result.push(
      allCarouselItems[index]
        .item(i % carouselItemsLength)
        ?.cloneNode(deep) as HTMLElement
    );
  }
  return result;
};

// Stores the current position for each carousel.
const allCarouselItems: HTMLCollection[] = [];
const carouselPositions: number[] = [];
const isScrolling: boolean[] = [];
const prevScrollDirection: string[] = [];
for (let i = 0; i < leftArrows.length; i++) {
  allCarouselItems[i] = carouselItemContainers[i].children;
  carouselPositions.push(0);
  isScrolling.push(false);
}

// Reorder the elements in the carousel item container.
const initializeCarousel = (index: number) => {
  // The list of active carousel items; node list of elements.
  const activeCarouselItems: Element[] = [];

  // Fills the active carousel items list with the first
  // carouselItemsVisible items. May need to wrap around.
  for (let i = 0; i < carouselItemsVisible; i++) {
    const element = allCarouselItems[index].item(
      i % allCarouselItems[index].length
    );
    if (i < carouselItemsVisible && element) {
      activeCarouselItems.push(element);
    }
  }

  // Replace the carousel items with the active carousel items.
  carouselItemContainers[index].replaceChildren(...activeCarouselItems);
};
initializeCarousel(0);

// Click event listener for all left carousel arrow.
Array.from(leftArrows).forEach((leftArrow, index) => {
  leftArrow.addEventListener("click", () => {
    if (!isScrolling[index]) {
      // Indicate the scrolling direction.
      prevScrollDirection[index] = "left";

      // Add appropriate previous items.
      const prevItems = getNCarouselItems(
        index,
        carouselScrollBy,
        -carouselScrollBy
      );
      carouselItemContainers[index].prepend(...prevItems);

      // Add two dummy next items.
      const nextItems = getNCarouselItems(index, carouselScrollBy, 0, false);
      nextItems.forEach((item) => {
        item.classList.add("dummy");
      });
      carouselItemContainers[index].append(...nextItems);

      // Moving the carousel to the left.
      carouselPositions[index] -= 1;
      transformCarouselItems(index);

      // Allow next button input.
      isScrolling[index] = true;
    }
  });
});

// Click event listener for all right carousel arrow.
Array.from(rightArrows).forEach((rightArrow, index) => {
  rightArrow.addEventListener("click", () => {
    if (!isScrolling[index]) {
      // Indicate the scrolling direction.
      prevScrollDirection[index] = "right";

      // Add appropriate next items.
      const nextItems = getNCarouselItems(
        index,
        carouselScrollBy,
        carouselItemsVisible
      );
      carouselItemContainers[index].append(...nextItems);

      // Add two dummy previous items.
      const prevItems = getNCarouselItems(index, carouselScrollBy, 0, false);
      prevItems.forEach((item) => {
        item.classList.add("dummy");
      });
      carouselItemContainers[index].prepend(...prevItems);

      // Moving the carousel to the right.
      carouselPositions[index] += 1;
      transformCarouselItems(index);

      // Allow next button input.
      isScrolling[index] = true;
    }
  });
});

// Transitionend event for all carousel item containers.
Array.from(carouselItemContainers).forEach((carouselItemContainer, index) => {
  carouselItemContainer.addEventListener("transitionend", () => {
    // Get the current length of the carousel item container.
    const carouselItemContainerLength = carouselItemContainer.children.length;

    // Remove the dummy items and non-visible items.
    if (prevScrollDirection[index] === "left") {
      for (
        let i = carouselItemContainerLength - 1;
        i > carouselItemContainerLength - 1 - carouselScrollBy * 2;
        i--
      ) {
        carouselItemContainer.children[i].remove();
      }
    } else if (prevScrollDirection[index] === "right") {
      for (let i = 0; i < carouselScrollBy * 2; i++) {
        carouselItemContainer.children[0].remove();
      }
    }
    isScrolling[index] = false;
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
