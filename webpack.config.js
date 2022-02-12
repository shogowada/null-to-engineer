const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const publicDir = path.join(__dirname, "public");
const staticDir = path.join(publicDir, "static");

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: {
    main: "./src/client/index.tsx",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HTMLWebpackPlugin({
      template: path.join(__dirname, "index.template.html"),
      title: "経験ゼロからエンジニア",
      hash: true,
      publicPath: "static",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, "imgs", "*.jpg"),
          to: path.join(staticDir),
        },
      ],
    }),
  ],
  output: {
    path: staticDir,
    filename: "main.js",
  },
};
