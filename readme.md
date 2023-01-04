# Freighter

<!-- Add an image by link -->

![Version](https://img.shields.io/npm/v/freighterjs)
![Activity](https://img.shields.io/github/last-commit/paytonshaltis/freighter/main)
![License](https://img.shields.io/npm/l/freighterjs)

A highly customizable carousel library for the web.

## Changing Carousel Properties

The following is a table that details exactly which Carousel properties can be changed and if changing them is currently implemented.

| Carousel Style Property    | Changeable | Implemented |
| :------------------------- | :--------: | :---------: | 
| `containerID`              |     ❌     |      ✔      |
| `resizingMethod`           |     ❌     |      ✔      | 
| `wrappingMethod`           |     ❌     |      ✔      | 
| `itemWidth`                |     ✔      |      ✔      | 
| `itemHeight`               |     ✔      |      ✔      | 
| `itemSpacing`              |     ✔      |      ✔      | 
| `numItemsVisible`          |     ✔      |      ✔      | 
| `scrollBy`                 |     ✔      |      ✔      | 
| `syncScrollWithVisibility` |     ✔      |      ✔      | 
| `scrollable`               |     ✔      |      ✔      | 
| `autoScroll`               |     ✔      |      ✔      |
| `autoScrollInterval`       |     ✔      |      ✔      | 
| `autoScrollDirection`      |     ✔      |      ✔      | 
| `autoScrollPauseOnHover`   |     ✔      |      ✔      | 
| `transitionDuration`       |     ✔      |      ✔      | 
| `transitionDelay`          |     ✔      |      ✔      | 
| `transitionTimingFunction` |     ✔      |      ✔      |
| `buttonStyles`             |     ✔      |      ✔      | 
| `buttonHoverStyles`        |     ✔      |      ✔      | 
| `leftButtonStyles`         |     ✔      |      ✔      | 
| `leftButtonHoverStyles`    |     ✔      |      ✔      | 
| `rightButtonStyles`        |     ✔      |      ✔      | 
| `rightButtonHoverStyles`   |     ✔      |      ✔      | 
| `showTimeline`             |     ✔      |     ❌      |

| Button Style Property     | Changeable | Implemented |
| :------------------------ | :--------: | :---------: |
| `width`                   |     ✔      |      ✔      |
| `height`                  |     ✔      |      ✔      |
| `position`                |     ✔      |      ✔      |
| `borderTop`               |     ✔      |      ✔      |
| `borderRight`             |     ✔      |      ✔      |
| `borderBottom`            |     ✔      |      ✔      |
| `borderLeft`              |     ✔      |      ✔      |
| `borderTopLeftRadius`     |     ✔      |      ✔      |
| `borderTopRightRadius`    |     ✔      |      ✔      |
| `borderBottomLeftRadius`  |     ✔      |      ✔      |
| `borderBottomRightRadius` |     ✔      |      ✔      |
| `backgroundColor`         |     ✔      |      ✔      |
| `color`                   |     ✔      |      ✔      |
| `cursor`                  |     ✔      |      ✔      |
| `transition`              |     ✔      |      ✔      |

## Reserved Carousel IDs and Classes

The following is a list of the internal IDs and classes used to keep track of the carousel's elements. These are reserved and should not be used for any other purpose.

### IDs

- `freighter-carousel-container-*`
- `freighter-carousel-item-container-wrapper-*`
- `freighter-carousel-item-container-*`
- `freighter-carousel-item-*-*`
- `freighter-carousel-arrow-left-*`
- `freighter-carousel-arrow-right-*`

### Classes

- `freighter-carousel-container`
- `freighter-carousel-item-container-wrapper`
- `freighter-carousel-item-container`
- `freighter-carousel-item`
- `frieghter-carousel-item-dummy`
- `freighter-carousel-arrow-left`
- `freighter-carousel-arrow-right`
