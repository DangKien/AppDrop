/** @format */

// Dependencies
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackInjector = require("html-webpack-injector");
const sass = require("sass");

const PATHS = {
  src: path.join(__dirname, "./src"),
  build: path.join(__dirname, "./build"),
  html: path.join(__dirname, "./src/templates/pages"),
};

const webpackConfig = {
  mode: process.env.NODE_ENV ? "production" : "development",
  entry: {
    index: `${PATHS.src}/scripts/index.js`,
    chat: `${PATHS.src}/scripts/chat.js`,
    home: `${PATHS.src}/scripts/home.js`,
    live: `${PATHS.src}/scripts/live.js`,
    shop: `${PATHS.src}/scripts/shop.js`,
    product: `${PATHS.src}/scripts/product.js`,
  },
  output: {
    path: PATHS.build,
    filename: "[name].js",
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackInjector(),
    new HtmlWebPackPlugin({
      template: `${PATHS.html}/home.html.twig`,
      filename: "index.html",
      chunks: ["index", "home"],
      title: "Homepage",
    }),

    new HtmlWebPackPlugin({
      template: `${PATHS.html}/chat.html.twig`,
      filename: "chat.html",
      chunks: ["index", "chat"],
      title: "ChatPage",
    }),

    new HtmlWebPackPlugin({
      template: `${PATHS.html}/live.html.twig`,
      filename: "live.html",
      chunks: ["index", "live"],
      title: "Live streams",
    }),

    new HtmlWebPackPlugin({
      template: `${PATHS.html}/shop.html.twig`,
      filename: "shop.html",
      chunks: ["index", "shop"],
      title: "Shop",
    }),

    new HtmlWebPackPlugin({
      template: `${PATHS.html}/product-detail.html.twig`,
      filename: "product-detail.html",
      chunks: ["index", "product", "home"],
      title: "Detail Product",
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
          minSize: 0,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
      },
      {
        test: /\.twig$/,
        loader: "twig-loader",
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
            options: {
              implementation: sass,
            },
          },
        ],
      },
    ],
  },
};

if (process.env.NODE_ENV === "production") {
  webpackConfig.devtool = "source-map";
}
if (process.env.NODE_ENV === "development") {
}

module.exports = webpackConfig;
