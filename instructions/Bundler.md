# バンドラーを使う

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

1. `npm install --save-dev webpack webpack-cli` を実行する

`--save-dev` と書くことで、「これは開発に必要なライブラリで、アプリを実行するときは必要ありませんよ」と NPM に教えることができるよ。
バンドルは開発中にすることでアプリを実行するときには必要ないから、webpack は開発用のライブラリとしてインストールしてるんだ。
あまりピンとこないかな？開発の経験を得るうちにだんだんと分かってくることもあるから、今は深く気にしなくてもいいよ！

## webpack の設定

まず、`package.json` に `"type": "module"` と追加しよう。
ファイルをつなげる方法は大きく分けて２つあるんだけど、`"type": "module"` を追加することで、新しい方法でファイルをつなげることができるんだ

```json
{
  "name": "react-todo-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.3"
  },
  "devDependencies": {
    "webpack": "^5.70.0"
  }
}
```

次は `webpack.config.js` ファイルを作って、下の内容を書こう

```javascript
import * as url from "url";
import * as path from "path";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./src/client/index.js",
  output: {
    path: path.join(__dirname, "public"),
    filename: "index.js",
  },
};
```

`entry` はバンドルするときに一番最初に読み込むファイルを設定して、`output` ではバンドル化されたファイルをどこに書き出すかを設定しているよ

`__dirname` は特別な変数で、常に今のファイルがあるフォルダのパスが入っているんだ。
例えばもしこの `webpack.config.js` が `/foo` フォルダにあるとしたら、`__dirname` には `/foo` が入るよ。

`path.join()` は複数のパスを１つにつなげてくれるよ。ここでは `__dirname` と `public` をつなげているから、
もし `__dirname` が `/foo` だとしたら、 つながれたパスは `/foo/public` となるよ。

## React と Babel を NPM パッケージとして使う

今までは React や Babel を `script` 要素を使って HTML から読み込んでいたね。
HTML に下のような記述があるはず。これを全部消そう！

```html
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
```

次に、`react` と `react-dom` を NPM パッケージとしてインストールして使おう。

1. `npm install --save-dev react react-dom` を実行する
2. `src/client/index.js` の一番上に、以下のコードを追加する
   ```javascript
   import * as React from "react";
   import * as ReactDOM from "react-dom";
   ```

次に、JSX を使えるように Babel と webpack を統合させるよ！
少し小難しくなるから、今は深く考えずにおまじないとして書いていてもいいよ！

1. `npm install --save-dev @babel/core @babel/preset-react babel-loader` を実行する
   - `@babel/core` は Babel の肝になるライブラリ
   - `@babel/preset-react` は Babel が JSX を理解するのに必要
   - `babel-loader` は Babel と webpack との統合に必要
2. `.babelrc` というファイル（Babel の設定ファイル）を作り、に以下の内容を書く
   ```json
   {
     "presets": ["@babel/preset-react"]
   }
   ```
3. `webpack.config.js` に以下のように `module` を追加する

   ```javascript
   // 他のコード...
   export default {
     // 他の設定...
     module: {
       rules: [
         {
           test: /\.js$/,
           exclude: /\/node_modules\//,
           use: ["babel-loader"],
         },
       ],
     },
   };
   ```

`webpack.config.js` に何やら見慣れないものが出てきたね。

JavaScript では、`/` で囲まれた文字列は正規表現を表すよ。
正規表現を使うと、文字列があるパターンに沿っているかどうかを判断できるんだ。

`/\.js$/` は「`.js`で終わる文字列」を表していて、`/\/node_modules\//` は「`/node_modules/` が含まれている文字列」を表しているよ。
何でそうなるのか、正規表現について詳しく知りたい人は [MDN のドキュメント](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_Expressions)を見てみてね！
正規表現はとても多くの人が頭を悩ます複雑なものなんだけど、使い方が分かってくると便利だよ。

さて話を戻して、ここでは `.js` で終わるファイル（ただし `node_modules` 内のファイルを除く）に、`babel-loader` を適用してね、と webpack に教えているよ。
この設定と `.babelrc` の設定のお陰で、webpack はファイルをバンドルする際に、Babel を使って JSX を理解することができるようになるんだ。
