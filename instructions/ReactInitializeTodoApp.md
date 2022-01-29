# React のプロジェクトを作る

## プロジェクトを初期化しよう

まずプロジェクトを作る場所にフォルダを作って、NPM を使ってそこにプロジェクトを作ろう 🙌
「プロジェクト」というと大袈裟だけど、ただ色々なファイルが集まってるだけだよ 😉

1. `react-todo-app`というフォルダを作る
1. VS Code を開く
1. File→Open から、`react-todo-app`フォルダを開く
1. Terminal→New Terminal から、ターミナルを開く
   - これは Windows でいうコマンドプロンプトみたいなものだよ
1. ターミナルで`npm init`を実行する
1. 色々聞かれるので、質問が終わるまで全部そのままエンターキーを押す
   - 全部デフォルトの設定で問題なし！

この時点で、`react-todo-app`フォルダ内に`package.json`というファイルが作られたはず 👀
これは NPM でプロジェクトを作るときにとても大切なファイルで、このプロジェクトの名前やバージョン、
依存しているライブラリとかを全部記述しているんだ ✍️

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

`express`はウェブサーバーを作るときに使うライブラリだよ。上のコマンドを実行することで、プロジェクトに`express`をインストールしたんだ 👍

今`package.json`を見てみると、`express`が`dependencies`として追加されているはず。
こうやって「このアプリを動かすには、このライブラリが必要です」って記憶しているんだよ 😄

React を同じようにインストールして使う方法もあるんだけど、ちょっと難しいからそれはまた今度ね 🙃

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
必ず書かなきゃいけないおまじないみたいなもの 🪄

### html 要素

[`html`要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/html)は HTML の全体を表す要素。
全ての要素は`html`要素の中に書かれることになるよ 🙂

ここでは[`lang`属性](https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/lang)を使って言語の設定もしているね。`ja`は日本語を表すコードだよ 🗾

### head 要素

[`head`要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/head)はメタデータ（機械のためのデータ）を記述する要素。

[`title`要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/title)を使ってウェブサイトの名前を指定したり、
[`script`要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/script)を使って JavaScript を読み込んだりできるよ 😄

### body 要素

[`body`要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/body)は HTML で表示されるコンテンツを表す要素。

React で開発する場合は React でコンテンツを書くことになるけど、React が使う器になる要素、`<div id="root"/ >`はここで用意しておこう 😎

## JavaScript ファイルを作ろう

`public`フォルダーの中に`index.js`というファイルを作って、以下の内容を書こう 💻

```javascript
const rootElement = document.getElementById("root");
ReactDOM.render(<h1>Hello, World!</h1>, rootElement);
```

次に、このファイルを HTML から読み込もう。`head`要素の中に、下の`script`要素を追加してね！
JSX を使えるように、`type="text/babel"`を書くのも忘れずにね 👀

```html
<script defer type="text/babel" src="index.js"></script>
```

`defer`を付けることで、他のコードを読み込んでからこのコードを読み込むように指定することができるんだ 🤔
React や Babel が読み込まれた状態じゃないとこのコードは動かせないから、`defer`を使ってこのコードを最後に読み込むようにしてるんだよ ✨

## ウェブサーバーを作ろう

ウェブサーバーはウェブサイトに必要なものを供給（サーブ）するものだよ 😶
ウェブサーバーには express というライブラリを使おう。

今度は`react-todo-app`フォルダの中に`index.js`というファイルを作って、以下のコードを書こう。

```javascript
// express を読み込む
const express = require("express");

// express のサーバーを作る
const app = express();

// public フォルダ内のファイルを供給する
app.use(express.static("public"));

// 上で設定したものを、ポート番号 8080 でサーブする
const Port = 8080;
app.listen(Port, () => {
  // 無事サーバーが起動されたら、この関数が呼ばれるよ
  console.log(`Started server on port ${Port}`);
});
```

## ウェブサーバーを起動する

ウェブサーバーを起動すると、今作ったウェブサイトをブラウザから見ることができるよ 😲
まだインターネットには公開していなくて、自分のパソコンからしか見れないから安心してね 👍

1. ターミナルで`node index.js`を実行する
1. ブラウザで http://localhost:8080 を開く
   - `:8080`を忘れると HTTP のデフォルトのポート`80`に繋ごうとしちゃうから、`:8080`を忘れないでね！

大きな「Hello, World!」が表示されたら成功だよ 🎉

ウェブサーバーを停止するには <kbd>Ctrl</kbd> + <kbd>C</kbd> を押してね 🙂
