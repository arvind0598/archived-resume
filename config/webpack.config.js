const path = require('path');
const fs = require('fs');
// const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const pugRule = {
  test: /\.pug$/,
  use: ['html-loader?attrs=false', 'pug-html-loader'],
};

const sassRule = {
  test: /\.(scss|css)/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
    },
    {
      loader: 'postcss-loader',
      options: {
        autoprefixer: {
          browsers: ['last 2 versions'],
        },
        plugins: () => [autoprefixer],
      },
    },
    {
      loader: 'sass-loader',
    },
  ],
};

const config = {
  entry: './src/app.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  devtool: 'source-map',
  module: {
    rules: [pugRule, sassRule],
  },
  plugins: [
    ...fs.readdirSync('./src')
      .filter(file => file.slice(-4) === '.pug')
      .map(name => name.slice(0, -4))
      .map(name => new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: `src/${name}.pug`,
        inject: true,
      })),
    new MiniCssExtractPlugin({
      filename: '[name]-styles.css',
      chunkFilename: '[id].css',
    }),
  ],
};

module.exports = config;
