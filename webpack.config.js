const path = require("path");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const filename = (ext) => (isDev ? `[name].${ext}` : `[name].${ext}`);

module.exports = {
  mode: "development",
  entry: {
    index: path.resolve(__dirname, "./dev/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: filename("js"),
    publicPath: "./",
    assetModuleFilename: "assets/[name].[ext]"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "App",
      myPageHeader: "app",
      template: "./dev/index.html",
      filename: filename("html"), //relative to root of the application
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|jpe?g|gif|svg|mp4|woff2)$/i,
        type: "asset/resource",
      },

    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    minimize: true,
  },
  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 8080,
  },
};
