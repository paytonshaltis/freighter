const path = require("path");

module.exports = {
  entry: "./js-output/Freighter.js",
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
