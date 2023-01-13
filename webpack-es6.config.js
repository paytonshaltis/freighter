// Configuration file for webpack to build an ES6 module for Freighter.

const path = require("path");

module.exports = {
  entry: "./dist/js-output/Freighter.js",
  experiments: {
    outputModule: true,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "FreighterES6.js",
    globalObject: "this",
    library: {
      type: "module",
    },
  },
};
