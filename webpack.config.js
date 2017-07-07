'use strict';
const ExtractText = require('extract-text-webpack-plugin');

const API_URL = process.env.API_URL || 'http://localhost:3000';

const extractSCSS = new ExtractText('../stylesheets/bundle.css');

let plugins = [
  extractSCSS,
];

module.exports = {
  entry: `${__dirname}/app/angular/entry.js`,
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/app/public/javascripts`,
  },

  plugins: plugins,

  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.scss$/,
        use: extractSCSS.extract({
          use: [{
            loader: 'css-loader', options: {
              sourceMap: true,
            },
          }, {
            loader: 'postcss-loader', options: {
              sourceMap: true,
            },
          }, {
            loader: 'sass-loader', options: {
              sourceMap: true,
            },
          }],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
      {
        test: /\.(woff|svg|eot|ttf).*/,
        use: {
          loader: 'url-loader?limit=10000&name=font/[name].[ext]',
        },
      },
      {
        test: /\.(jpg|gif|png)$/,
        use: {
          loader: 'file-loader?name=image[hash]-[name].[ext]',
        },
      },
    ]
  },
};
