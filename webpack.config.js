const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const publicDir = path.join(__dirname, "public");

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
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: () => [require("autoprefixer")],
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, "index.html"),
      title: "０から始めるプログラミング",
      hash: true,
    }),
  ],
  output: {
    path: publicDir,
    filename: "main.js",
  },
};
