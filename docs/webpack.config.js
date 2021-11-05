const path = require('path');

module.exports = {
  mode: 'production',
  resolve: {
    modules: [
      path.resolve(__dirname, '_js'),
      'node_modules',
    ],
  },
  entry: {
    observer: 'observer.js',
    searchBar: 'searchBar.js',
    lottie: 'importLottie.js',
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, './assets/js'),
    filename: '[name].bundle.js',
  },
};
