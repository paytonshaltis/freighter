const path = require("path");

module.exports = {
  entry: "./js-output/Freighter.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "webpack-numbers.js",
  },
};
