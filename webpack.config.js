
const path = require('path');

module.exports = {
  entry: './src/ts/js/index.js',
  watch: true,
  mode: "development",
  output: {
    filename: './build/main.js',
    path: path.resolve(__dirname, ''),
  },
};