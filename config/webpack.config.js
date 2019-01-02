const path = require('path');
const fs = require('fs');
// const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const cssNano = require('cssnano');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV !== 'production';

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
      options: {
        sourceMap: isDev,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        autoprefixer: {
          browsers: ['last 2 versions'],
        },
        sourceMap: isDev,
        plugins: () => [
          autoprefixer,
          ...(isDev ? [] : [cssNano]),
        ],
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: isDev,
      },
    },
  ],
};

const config = {
  entry: './src/app.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  devtool: isDev && 'source-map',
  devServer: {
    port: 3000,
    open: true,
  },
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
        minify: !isDev && {
          html5: true,
          collapseWhitespace: true,
          caseSensitive: true,
          removeComments: true,
          removeEmptyElements: false,
        },
      })),
    new MiniCssExtractPlugin({
      filename: '[name]-styles.css',
      chunkFilename: '[id].css',
    }),
  ],
};

module.exports = config;
