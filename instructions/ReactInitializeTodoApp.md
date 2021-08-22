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

1. ターミナルで`npm install express`を実行する

`express`はウェブサーバーを作るときに使うライブラリだよ。

今`package.json`を見てみると、それぞれのライブラリが`dependencies`として追加されているはず。
こうやって「このアプリを動かすには、このライブラリが必要です」って記憶しているんだ。

React を同じように読み込んで使う方法もあるんだけど、ちょっと難しいからそれはまた今度ね！

## HTML ファイルを作ろう

1. VS Code で右クリック →New Folder から、`public`というフォルダを作る
1. `public`フォルダを右クリック →New File から、フォルダ内に`index.html`というファイルを作る
1. `index.html`に以下の内容を書く

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <title>タスク管理アプリ</title>
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

[`<!DOCTYPE html>`](https://developer.mozilla.org/ja/docs/Glossary/Doctype)、
[`html`要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/html)、
[`head`要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/head)、
それに[`body`要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/body)は初めてみたね！
一つずつみていこう。

### \<!DOCTYPE html>

[`<!DOCTYPE html>`](https://developer.mozilla.org/ja/docs/Glossary/Doctype)はブラウザに「これは HTML ですよ」と教えるもの。
必ず書かなきゃいけないおまじないみたいなもの！

### html 要素

[`html`要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/html)は HTML の全体を表す要素。
全ての要素は`html`要素の中に書かれることになるよ！

ここでは[`lang`属性](https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/lang)を使って言語の設定もしているね。`ja`は日本語を表すコードだよ！

### head 要素

[`head`要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/head)はメタデータ（機械のためのデータ）を記述する要素。

[`title`要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/title)を使ってウェブサイトの名前を指定したり、
[`script`要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/script)を使って JavaScript を読み込んだりできるよ。

### body 要素

[`body`要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/body)は HTML で表示されるコンテンツを表す要素。

React で開発する場合は React でコンテンツを書くことになるんだけど、React が使う器になる要素、`<div id="root"/ >`はここで用意しておこう！

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

おーっと、ポート番号って何だろね！ポート番号について理解するために、少し URL について見てみようか。

## URL って何？

[URL](https://ja.wikipedia.org/wiki/Uniform_Resource_Locator)（ユー・アール・エル、Uniform Resource Locator）はインターネット上にあるものの場所を指定する文字列だよ。

## ウェブサーバーを起動する

ウェブサーバーを起動すると、今作ったウェブサイトをブラウザから見ることができるよ。
まだインターネットには公開していなくて、自分のパソコンからしか見れないから安心してね！

1. ターミナルで`node index.js`を実行する
1. ブラウザで http://localhost:8080 を開く

大きな「Hello, World!」が表示されたら成功だよ！
