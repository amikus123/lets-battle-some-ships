
const path = require('path');

module.exports = {
  entry: './build/index.js',
  watch: true,
  mode: "development",
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, ''),
  },
};