'use strict';
const ExtractText = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

let plugins = [
  new ExtractText('bundle.css'),
];

module.exports = {
  entry: `${__dirname}/app/entry.js`,
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/build/`,
  },

  postcss: () => {
    return[autoprefixer];
  },
  
  plugins: plugins,

  module: {
    rules: [
      //html loader
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader',
        },
      },
      //less loader
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ExtractText.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader'],
        }),
      },
      //babel loader
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
      //file loader
      {
        test: /\.(woff|svg|eot|ttf).*/,
        loader: 'url-loader?limit=10000&name=font/[name].[ext]',
      },
      {
        test: /\.(jpg|gif|png)$/,
        loader: 'file-loader?name=image[hash]-[name].[ext]',
      },
    ]
  },
};
