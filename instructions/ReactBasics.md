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

React では JSX という、とても HTML に似たものを書くことになるよ。
本当にとても似てるんだけど、いくつか大きな違いがあるんだ。

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

## JSX での属性

HTML みたいに、要素の属性を指定することもできるよ。

```javascript
const button = <button type="button">ボタン</button>;

ReactDOM.render(button, document.getElementById("root"));
```

`""`の代わりに`{}`を使うことで、変数や値を渡すこともできるよ。

```javascript
const buttonType = "button";
const button = <button type={buttonType}>ボタン</button>;

ReactDOM.render(button, document.getElementById("root"));
```

気をつけなきゃいけないのが、もし属性が複数の文字でできている場合、続く文字の頭文字を大文字にしなきゃいけないこと。

例えば HTML だとこうなるものが、

```html
<input type="text" maxlength="5" />
```

JSX だとこうなる。

```javascript
// HTML と違って、L が大文字なところに注目
// あと HTML と違って、{}を使って数値を渡しているね
const input = <input type="text" maxLength={5} />;

ReactDOM.render(input, document.getElementById("root"));
```

ちなみに文字列を大文字で区切るのを camelCase（キャメルケース）と呼ぶよ。
ラクダ（英語で camel）みたいに見えるからそう呼ばれるようになったんだね。

## JSX でのイベント

イベントは、属性に関数を渡すことで処理できるよ。

例えば`click`イベントを処理したい場合、`onClick`属性に関数を渡すことができるんだ。

```javascript
ReactDOM.render(
  <button
    type="button"
    onClick={() => {
      console.log("ボタンが押された！");
    }}
  >
    押したあとにコンソールログを見て！
  </button>,
  document.getElementById("root")
);
```

## JSX での CSS

JSX で CSS を使う際には、少し注意しなきゃいけないことがあるんだ。

まず、HTML では`class`属性を使って CSS のクラスを指定してたんだけど、JSX だと`className`を使わなきゃいけないんだ。

HTML ではこうなんだけど、

```html
<h1 class="primary-header">Hello, World!</h1>
```

JSX ではこうなる。

```javascript
<h1 className="primary-header">Hello, World!</h1>
```

あと`style`属性の値も、HTML だと文字列を渡してたのに対して、JSX だとオブジェクトを渡すことになるよ。
そのとき、HTML だと`-`を使ってプロパティの文字を区切っていたのに対して、JSX だと camelCase にしなきゃいけないんだ。

言葉で説明しても分かりにくいから、例をみてみよう。

HTML ではこうなるものが、

```html
<h1 style="background-color: green;">Hello, World!</h1>
```

JSX ではこうなる。

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

コンポーネントの名前は、必ず大文字から初めてね。
camelCase みたいだけど、最初の文字も大文字。こういうのを PascalCase（パスカルケース）と呼ぶよ。
これは [Pascal](https://ja.wikipedia.org/wiki/Pascal) というプログラミング言語が語源になっているんだ。

コンポーネントは、そのまま要素みたいに描画することができるよ。

```javascript
const HelloWorld = () => {
  return <h1>Hello, World!</h1>;
};

ReactDOM.render(<HelloWorld />, document.getElementById("root"));
```

コンポーネントから他のコンポーネントを描画することもできるよ。

```javascript
const Content = () => {
  return <p>段落だよ</p>;
};

const Article = () => {
  return (
    <div>
      <h1>ヘッダーだよ</h1>
      <Content />
    </div>
  );
};

ReactDOM.render(<Article />, document.getElementById("root"));
```

## props（プロップス）

[props](https://ja.reactjs.org/docs/components-and-props.html) と呼ばれるものを使うことで、コンポーネントに値を渡すことができるよ。

普通の関数のパラメータみたいに受け取って使うことができる。

```javascript
const HelloWorld = (props) => {
  return <h1>Hello, {props.name}!</h1>;
};

// props は、属性としてコンポーネントに渡すことができる
ReactDOM.render(<HelloWorld name="World" />, document.getElementById("root"));
```

気をつけなきゃいけないのは、props は読み取り専用だってこと。

```javascript
const HelloWorld = (props) => {
  props.name = "World"; // これやっちゃダメ！
  return <h1>Hello, {props.name}!</h1>;
};
```

## state（ステート）

props と違って [state](https://ja.reactjs.org/docs/state-and-lifecycle.html) と呼ばれるものを使うことで、コンポーネントに変更可能な変数を持たせることができるんだ。

ステートは[`React.useState()`](https://ja.reactjs.org/docs/hooks-reference.html#usestate)という関数を使って作ることができるよ。
この関数は現在のステートと、そのステートを変えるための関数を返すんだ。

```javascript
// state は現在のステート
// setState はステートを変える関数
// initialState はステートの最初の値
// それぞれの名前は好きに変えていいよ！
const [state, setState] = React.useState(initialState);
```

例えば下のように`setState`の方（この例では`setIsHiding`という名前）に次のステートを渡すことで、ステートを変えることができる。

```javascript
const Peekaboo = () => {
  // React.useState に true を渡しているから、最初は isHiding が true になる
  const [isHiding, setIsHiding] = React.useState(true);
  return (
    <button
      type="button"
      onClick={() => {
        setIsHiding(false);
      }}
    >
      {isHiding ? "🙈いないいない" : "🐵ばあ！"}
    </button>
  );
};

ReactDOM.render(<Peekaboo />, document.getElementById("root"));
```

もし次のステートを計算するのに前のステートが必要な場合は、[`setState`に関数を渡さなきゃいけないよ](https://ja.reactjs.org/docs/hooks-reference.html#functional-updates)。
`setState`に関数を渡した場合、現在のステートをパラメータとして受け取れるから、それを使って次のステートを計算することができるんだ。

例えば下の例では、ボタンを押すごとに`isHiding`が反転するようになるよ。

```javascript
const Peekaboo = () => {
  const [isHiding, setIsHiding] = React.useState(true);
  return (
    <button
      type="button"
      onClick={() => {
        // setIsHiding に関数を渡すと、前のステートを受け取れる
        // 次のステートを返すことで、ステートを変えよう
        // prev は previous（「前の」という意味）の略として、React ではよく使われるよ
        setIsHiding((prevIsHiding) => !prevIsHiding);

        // つまり、下のように書いちゃダメなんだ
        // setIsHiding(!isHiding);
      }}
    >
      {isHiding ? "🙈いないいない" : "🐵ばあ！"}
    </button>
  );
};

ReactDOM.render(<Peekaboo />, document.getElementById("root"));
```

`React.useState()`は、React のフックと呼ばれる機能の一部なんだ。
他にも色々なフックがあるから、気になったら[ドキュメント](https://ja.reactjs.org/docs/hooks-reference.html)を見てね！
