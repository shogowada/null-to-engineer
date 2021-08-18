# React のプロジェクトを作る

## プロジェクトを初期化しよう

まずプロジェクトを作る場所にフォルダを作って、NPM を使ってそこにプロジェクトを作ろう。
「プロジェクト」というと大袈裟だけど、ただ色々なファイルが集まってるだけなんだ。
だからまず、そのファイルを保存する場所を作るんだよ。

1. `react-todo-app`というフォルダを作る
1. VS Code を開く
1. File→Open から、`react-todo-app`フォルダを開く
1. Terminal→New Terminal から、ターミナルを開く
   - これは Windows でいうコマンドプロンプトみたいなものだよ
1. ターミナルで`npm init`を実行する
1. 色々聞かれるので、質問が終わるまで全部そのままエンターキーを押す
   - 全部デフォルトの設定で問題なし！

この時点で、`react-todo-app`フォルダ内に`package.json`というファイルが作られたはず。
これは NPM でプロジェクトを作るときにとても大切なファイルで、このプロジェクトの名前やバージョン、
依存しているライブラリとかを全部記述しているんだ。

今はまだ初期化したばかりで空っぽだから、中身はこんな風になってるはず。

```json
{
  "name": "react-todo-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

## 必要なライブラリをインストール

1. `npm install --save express react react-dom`

`express`はウェブサーバーを作るときに使うライブラリ、`react`は JSX を書くために使うライブラリ、`react-dom`は JSX を HTML に変換するライブラリだよ。

## HTML ファイルを作ろう

1. VS Code で右クリック →New Folder から、`public`というフォルダを作る
1. 右クリック →New File から、`public`フォルダの中に`index.html`というファイルを作る
1. `index.html`に以下の内容を書く

```html
<html>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>
```

[`html`要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/html)と[`body`要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/body)は初めてみたね！

`html`要素は HTML の全体を表す要素で、`body`要素は HTML で表示されるコンテンツを表す要素だよ。

一回 VS Code から離れて、作ったファイルをダブルクリックして開いてみて！
ブラウザが起動されて、"Hello, World!"と表示されたかな？

## React を読み込む

今までは`script`要素の場所を気にしてなかったけど、ここからは[`head`要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/head)の中に置こう！

`head`要素はメタデータ、つまり機械のためのデータを記述する場所なんだ。
外部の JavaScript を読み込むのはウェブページの内容には関係なく、機械が裏でやることだから、`script`要素は`head`要素の中に書くんだね。

あと React が使う器になる要素、`<div id="root"/ >`も用意しておこう！

```html
<html>
  <head>
    <script
      src="https://unpkg.com/react@17/umd/react.development.js"
      crossorigin
    ></script>
    <script
      src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"
      crossorigin
    ></script>
    <script
      src="https://unpkg.com/babel-standalone@6/babel.min.js"
      crossorigin
    ></script>
  </head>
  <body>
    <div id="root"/ >
  </body>
</html>
```

## JavaScript ファイルを作ろう

`public`フォルダーの中に`index.js`というファイルを作って、以下の内容を書こう。

```javascript
const rootElement = document.getElementById("root");
ReactDOM.render(<h1>Hello, World!</h1>, rootElement);
```

次に、このファイルを HTML から読み込もう。`head`要素の中に、下の`script`要素を書いてね！
JSX を使えるように、`type="text/babel"`を書くのも忘れずにね！

```html
<script defer type="text/babel" src="index.js"></script>
```

`defer`を付けることで、React や Babel、他の HTML を読み込んでからこのコードを読み込むように指定することができるんだ。
そうすることで、このコードを読み込んだときには全てが準備されている状態にできるんだね。

## ウェブサーバーを作ろう

ウェブサーバーはウェブサイトに必要なものを供給（サーブ）するものだよ。
ウェブサーバーには express というライブラリを使うよ。

```javascript
// express を読み込む
const express = require("express");

// express のサーバーを作る
const app = express();

// public フォルダ内のファイルを供給する
app.use(express.static("public"));

// ポート番号 8080 で設定したものを供給する
app.listen(8080);
```
