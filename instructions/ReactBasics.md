# 初めての React

## React って何？

[React](https://ja.reactjs.org) は JavaScript を使って HTML を書くことができるようになるライブラリだよ 🤔

例えば同じ形の要素を繰り返し書きたいときに JavaScript のループを使ったり、
特定の条件下でしか要素を書きたくないときに`if`を使ったりできるんだ 😲

実際に触りながら学んでいこう！

## Hello, World!

ここで書くことは呪文みたいなものだから、あまり細かいことは気にせずにコピー＆ペーストしててもいいよ 😊

まず、`script`要素を使って React を読み込もう！

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

React では、[JSX（JavaScript XML）](https://ja.reactjs.org/docs/introducing-jsx.htmll)と呼ばれる特別な JavaScript を使うんだ。
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

ここからの例では一番下の`script`要素の中身だけ書くけど、他のコードも全部必要だから消さないでね！

## JSX

JSX は HTML ととても似てるんだけど、いくつか大きな違いがあるよ。

まず、JSX は JavaScript の値みたいに、変数に覚えておいてもらったりできるよ。

```javascript
const helloWorld = <h1>Hello, World!</h1>;

ReactDOM.render(helloWorld, document.getElementById("root"));
```

`{}`を使うことで、他の変数や値を埋め込むこともできるんだ。

```javascript
const name = "World";
const helloWorld = <h1>Hello, {name}!</h1>;

ReactDOM.render(helloWorld, document.getElementById("root"));
```

HTML みたいに、要素の属性を指定することもできるよ。

```javascript
const button = <button type="button">ボタン</button>;

ReactDOM.render(button, document.getElementById("root"));
```

気をつけなきゃいけないのが、もし属性が複数の文字でできている場合、続く文字の頭文字を大文字にしなきゃいけないこと。

例えば HTML だとこうなるものが、

```html
<input type="text" maxlength="5" />
```

React だとこうなる。

```javascript
// HTML と違って、L が大文字なところに注目
// あと HTML と違って、{}を使って数値を渡しているね
const input = <input type="text" maxLength={5} />;

ReactDOM.render(input, document.getElementById("root"));
```

ちなみに文字列を大文字で区切るのを camelCase（キャメルケース）と呼ぶよ。
ラクダ（英語で camel）みたいに見えるからそう呼ばれるようになったんだね。

## React での CSS

React で CSS を使う際には、少し注意しなきゃいけないことがあるんだ。

まず、HTML では`class`属性を使って CSS のクラスを指定してたんだけど、React だと`className`を使わなきゃいけないんだ。

HTML ではこうなんだけど、

```html
<h1 class="primary-header">Hello, World!</h1>
```

React ではこうなる。

```javascript
<h1 className="primary-header">Hello, World!</h1>
```

あと`style`属性の値も、HTML だと文字列を渡してたのに対して、React だとオブジェクトを渡すことになるよ。
そのとき、HTML だと`-`を使ってプロパティの文字を区切っていたのに対して、React だと camelCase にしなきゃいけないんだ。

言葉で説明しても分かりにくいから、例をみてみよう。

HTML ではこうなるものが、

```html
<h1 style="background-color: green;">Hello, World!</h1>
```

React ではこうなる。

```javascript
<h1
  style={{
    backgroundColor: "green",
  }}
>
  Hello, World!
</h1>
```

ちなみに`-`で文字を区切る方法にも名前がついてるよ。
これは串に刺したケバブみたいに見えるから、kebab-case（ケバブケース）と呼ばれているんだ。

## コンポーネント

React では、[コンポーネント](https://ja.reactjs.org/docs/glossary.html#components)と呼ばれる関数を組み合わせることでウェブサイトを作っていくよ。
コンポーネントは JSX を返す関数なんだ。

例えば下の例だと、`HelloWorld`という関数が`<h1>Hello, World!</h1>`という JSX を返しているね。

```javascript
const HelloWorld = () => {
  return <h1>Hello, World!</h1>;
};
```

コンポーネントの名前は、必ず大文字から初めてね。camelCase みたいだけど、最初の文字も大文字。こういうのを PascalCase（パスカルケース）と呼ぶよ。
これは [Pascal](https://ja.wikipedia.org/wiki/Pascal) というプログラミング言語が語源になっているんだ。

コンポーネントは、そのまま要素みたいに描画することができるよ。

```javascript
const HelloWorld = () => {
  return <h1>Hello, World!</h1>;
};

ReactDOM.render(<HelloWorld />, document.getElementById("root"));
```

## props（プロップス）

[props](https://ja.reactjs.org/docs/components-and-props.html) と呼ばれるものを使うことで、コンポーネントに値を渡すことができるよ。

普通のパラメータみたいに関数に渡して使うことができる。

```javascript
const HelloWorld = (props) => {
  return <h1>Hello, {props.name}!</h1>;
};

const rootElement = document.getElementById("root");
// props は、属性としてコンポーネントに渡すことができる
ReactDOM.render(<HelloWorld name="World" />, rootElement);
```

上の例では`"World"`を`name`prop に渡しているね。もし変数を渡したい場合は、`{}`を使えるよ。

```javascript
const name = "World";
ReactDOM.render(<HelloWorld name={name} />, rootElement);
```

気をつけなきゃいけないのは、props は読み取り専用だってこと。

```javascript
const HelloWorld = (props) => {
  props.name = "World"; // これやっちゃダメ！
  return <h1>Hello, {props.name}!</h1>;
};
```

## state（ステート）

props と違って、[state](https://ja.reactjs.org/docs/state-and-lifecycle.html) と呼ばれるものを使うことで、コンポーネントに変更可能な変数を持たせることができるんだ。

```javascript
const HideAndSeek = () => {
  const [isVisible, setIsVisible] = React.useState(true);
  if (isVisible) {
    return <button></button>;
  }
};
```

```javascript
const Counter = () => {
  const [count, setCount] = React.useState(0);
  return (
    <button
      type="button"
      onClick={() => {
        setCount((previousCount) => previousCount + 1);
      }}
    >
      {count}回押された
    </button>
  );
};
```
