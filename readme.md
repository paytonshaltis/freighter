<div align="center">
  <img src="./docs/icons/train-engine.svg" width="200" alt="Freighter Logo">
  
  <br />
  <br />
  
  [![Version](https://img.shields.io/npm/v/freighterjs?style=flat-square&logo=npm)](https://npmjs.com/package/freighterjs)
  [![Activity](https://img.shields.io/github/last-commit/paytonshaltis/freighter/main?style=flat-square&logo=github)](https://github.com/paytonshaltis/freighter/commits/main)

  <h1>Freighter - The Responsive Carousel Library</h1>
  <p>Create responsive, dynamic, and customizable carousels. Control the wrapping and resizing behavior with a variety of built-in methods for ensuring your carousel looks great and works well on any device. Style and customize your carousel with properties including autoscroll behavior, specialized transitions, number of items to show and scroll by, and many more.</p>

</div>

## Documentation

Full documentation for Freighter can be found on the official [documentation website](https://paytonshaltis.github.io/freighter) for Freighter. Here, you will find detailed download instructions, detailed descriptions of all carousel properties, and useful demos for inspiration.

## Downloading

Visit the [downloads page](https://paytonshaltis.github.io/freighter/downloads) of the Freigher website to find every version of Freighter in all downloadable formats, including the original TypeScript source, JavaScript UMD and ES6 bundles, and the NPM release.

## Usage

### All Carousel Examples

See the [official documentation](https://paytonshaltis.github.io/freighter/documentation/basic-usage) for more detailed examples, code snippets, and live examples.

### Usage Basics

In order to create a Freighter carousel, you will need a `<div>` with some unique `id`, which will be targeted and act as the outermost container for your carousel. This element should contain as many other `<div>`s as you'd like, each of which will become a carousel item.

Use the `Freighter()` constructor to convert the element into a carousel. Note that this code should execute _after_ the element has been loaded to the DOM, otherwise, it will not be found. The constructor requires your container's `id`, a valid resizing method, a valid wrapping method, and a `CarouselProperties` object containing any other customizable carousel properties that you wish to initialize your carousel with. All of the properties within this object can be changed later with methods such as `setCarouselProperties()`, making Freighter carousels dynamic.

Below is an example of calling the constructor in a JavaScript file whose environment is using ES6 modules. Notice that the `Freighter` class is `import`ed; for environments that import modules differently (`require()`, etc.), see the [downloads page](https://paytonshaltis.github.io/freighter/downloads/#umd) for the UMD module.

```javascript
import Freighter from "freighter-1.0.2.js";

const myCarousel = new Freighter(
  "container-id",
  "stretch-scale",
  "wrap-smart",
  {
    numItemsVisible: 3,
    scrollBy: 1,
    itemHeight: 3,
    itemWidth: 5,
    transitionDuration: 250,
  }
);
```

### Next Steps

Eager to learn more about creating responsive carousels? Check out these links for recommended next steps!

- Learn about the powerful [resizing](https://paytonshaltis.github.io/freighter/documentation/resizing) and [wrapping](https://paytonshaltis.github.io/freighter/documentation/wrapping) methods.
- Get an overview of all dynamic [carousel properties](https://paytonshaltis.github.io/freighter/documentation/overview) that can be used to customize your carousel.
- Check out some [carousel demos](https://paytonshaltis.github.io/freighter/demos) to see what's possible with Freighter and spark some inspiration for your next project.
