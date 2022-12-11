const path = require("path");

module.exports = {
  entry: "./dist/js-output/Freighter.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "FreighterUMD.js",
    globalObject: "this",
    library: {
      name: "Freighter",
      type: "umd",
      export: "default",
    },
  },
};
