# 初めての React

## React って何？

[React](https://reactjs.org) は JavaScript を使って HTML を書くことができるようになるライブラリだよ 🤔

例えば同じ形の要素を繰り返し書きたいときに JavaScript のループを使ったり、
特定の条件下でしか要素を書きたくないときに`if`を使ったりできるんだ 😲

実際に触りながら学んでいこう！

## Hello, World!

ここで書くことは呪文みたいなものだから、あまり細かいことは気にせずにコピー＆ペーストしててもいいよ 😊

まず、React を読み込もう！

```html
<script
  src="https://unpkg.com/react@17/umd/react.development.js"
  crossorigin
></script>
<script
  src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"
  crossorigin
></script>
```

React では、[JSX（JavaScript XML）](https://reactjs.org/docs/introducing-jsx.html)と呼ばれる特別な JavaScript を使うんだ。
JSX のおかげで、JavaScript を使って HTML を書くことができるよ 😎
実際に JSX が何なのかは後で例を見ながら学ぼうね！
まずは JSX を使えるようにするために、[Babel](https://babeljs.io) と呼ばれるライブラリも読み込もう 🙂

```html
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

次に React が HTML を書き出すときに使われる要素を用意するよ。
これは React のために用意する器のようなもので、React はこの要素に色々と変更を加えることで実際の HTML に変更を加えていくんだ 😄

```html
<div id="root" />
```

そして最後の呪文、上で用意した要素を React に渡して、React に HTML を書いてもらおう！

`script`タグに`type="text/babel"`という属性がついているのは、この`script`要素内で JSX を使えるようにするおまじないだよ。

```html
<script type="text/babel">
  // 上で用意した要素にアクセス
  const rootElement = document.getElementById("root");

  // ReactDOM を使って React にアクセス
  ReactDOM.render(
    // この部分がJSXだよ！
    // JavaScriptの中に突然 HTML が現れたね 🤯
    <h1>Hello, World!</h1>,
    // React に上で用意した要素を渡そう
    rootElement
  );
</script>
```

全部つなげると、こんな感じになるよ 👀

```html
<script
  src="https://unpkg.com/react@17/umd/react.development.js"
  crossorigin
></script>
<script
  src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"
  crossorigin
></script>

<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

<div id="root"/ >

<script type="text/babel">
  const rootElement = document.getElementById("root");
  ReactDOM.render(<h1>Hello, World!</h1>, rootElement);
</script>
```

大きな"Hello, World!"が表示されたら成功だよ！

ただ`<h1>Hello, World!</h1>`という HTML を書くだけで、ずいぶんと大袈裟なコードを書いたね 😮
もちろん、ただ`<h1>Hello, World!</h1>`と書きたいだけなら React を使うのはやりすぎだけど、
複雑なアプリを作るときは React がとても役に立つんだ 😉

次は React でタスク管理アプリを作ってみようか 😄
