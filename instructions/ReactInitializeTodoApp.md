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

## HTML ファイルを作ろう

1. VS Code で右クリック →New File から、`index.html`というファイルを作る
2. 以下の内容を書く

```html
<html>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>
```

[`html`要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/html)と[`body`要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/body)は初めてみたね！

`html`要素は HTML の全体を表す要素で、`body`要素は HTML で表示されるコンテンツを表す要素だよ。

一回VS Codeから離れて、作ったファイルをダブルクリックして開いてみて！
ブラウザが起動されて、"Hello, World!"と表示されたかな？

