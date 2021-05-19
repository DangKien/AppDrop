// Dependencies
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
  },
  output: {
    path: PATHS.build,
    filename: "[name].js",
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebPackPlugin({
      template: `${PATHS.html}/home.html.twig`,
      filename: "index.html",
      chunks: ["index"],
      title: "Homepage",
    }),

    new HtmlWebPackPlugin({
      template: `${PATHS.html}/chat.html.twig`,
      filename: "chat.html",
      chunks: ["index", "chat"],
      title: "ChatPage",
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
