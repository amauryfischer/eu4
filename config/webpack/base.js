/* eslint-disable no-undef */
// config/webpack/base.js
const webpack = require("webpack")
const PnpWebpackPlugin = require("pnp-webpack-plugin")
const { webpackConfig } = require("@rails/webpacker")
const { merge } = require("webpack-merge")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const path = require("path")
const ForkTSCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")

webpackConfig.resolve.extensions.push(".tsx")
delete webpackConfig.optimization

module.exports = merge(webpackConfig, {
  plugins: [
    new ForkTSCheckerWebpackPlugin(),
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ],
  resolve: {
    extensions: [".js", ".mjs", ".ts", ".coffee", ".ts", ".tsx"],
    plugins: [PnpWebpackPlugin],
    fallback: {
      util: require.resolve("util/"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      zlib: require.resolve("browserify-zlib"),
      assert: require.resolve("assert/"),
      process: "process/browser",
    },
    alias: {
      components: path.resolve(
        __dirname,
        "..",
        "..",
        "app/javascript/app/components",
      ),
      hooks: path.resolve(__dirname, "..", "..", "app/javascript/app/hooks"),
      styles: path.resolve(__dirname, "..", "..", "app/javascript/app/styles"),
      services: path.resolve(
        __dirname,
        "..",
        "..",
        "app/javascript/app/services",
      ),
      reducer: path.resolve(
        __dirname,
        "..",
        "..",
        "app/javascript/app/reducer",
      ),
    },
  },

  resolveLoader: {
    plugins: [
      PnpWebpackPlugin.moduleLoader(module),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [],
      }),
    ],
  },
})
