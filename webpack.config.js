/** @format */

// Import path from Node JS
const path = require('path');
// Import HTML WEBPACK from Node JS
const HtmlWebpackPlugins = require('html-webpack-plugin');

module.exports = {
  entry: ['@babel/polyfill', './src/js/index.js'], // The root of the JS file in the source folder + polyfill to convert ES5 codes to ES6 codes
  output: {
    path: path.resolve(__dirname, 'dist'), //The JS file's root in the dist folder
    filename: 'js/bundle.js', //The name of JS file in the dist folder
  },
  devServer: {
    static: './dist', //The dist folder's root to show the live website
  },

  plugins: [
    // HTML WEBPAACK PLUGIN TO COPY html file from src to dist
    new HtmlWebpackPlugins({
      filename: 'index.html', //Name of Html file in in the source folder
      template: './src/index.html', //The root of the Html file in the source folder
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/, // Read all files with js format ...
        exclude: /node_modules/, // Exclude libraries in node_modules ...
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
    ],
  },
};
