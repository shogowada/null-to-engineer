# バンドラー

コンポーネントを作れるようにはなったけど、
今のままだと１つのファイルがどんどん大きくなって見づらいね 😵‍💫

沢山のファイルを使えるように、バンドラーと呼ばれるものを使おう 😄

ここでは [webpack](https://webpack.js.org) というバンドラーを使うよ 😊

## ファイルを移動する

まずは今ある JavaScript のファイルを、`public` フォルダから `src` フォルダに移動しよう

1. `src/client` フォルダを作る
2. `public/index.js` ファイルを `src/client` フォルダに移動する

webpack を使うと `src/client` フォルダにある複数の JavaScript ファイルを１つの JavaScript ファイルにして（バンドルして）、`public` フォルダに書き出すことができるよ

## 必要なライブラリをインストール

webpack も NPM のライブラリだから、NPM を使ってインストールできるよ 🙂

1. `npm install --save-dev webpack` を実行する

`--save-dev` と書くことで、「これは開発に必要なライブラリで、アプリを実行するときは必要ありませんよ」と NPM に教えることができるよ。
バンドルは開発中にすることでアプリを実行するときには必要ないから、webpack は開発用のライブラリとしてインストールしてるんだ。
あまりピンとこないかな？開発の経験を得るうちにだんだんと分かってくることもあるから、今は深く気にしなくてもいいよ！

## webpack の設定

```javascript
import * as path from "path";

module.exports = {
  entry: "./src/client/index.js",
  output: {
    path: path.join(__dirname, "public"),
    filename: "index.js",
  },
};
```
