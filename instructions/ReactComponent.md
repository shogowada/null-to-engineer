# コンポーネント

## Hello, World!

React では、[コンポーネント](https://ja.reactjs.org/docs/glossary.html#components)と呼ばれる関数を組み合わせることでウェブサイトを作っていくよ 😊
コンポーネントは JSX を返す関数なんだ。

例えば下の例だと、`HelloWorld`という関数が`<h1>Hello, World!</h1>`という JSX を返しているね 👀

```javascript
const HelloWorld = () => {
  return <h1>Hello, World!</h1>;
};
```

これだけでコンポーネントの完成だよ！

コンポーネントの名前は、必ず大文字から初めてね 👍
camelCase みたいだけど、最初の文字も大文字。こういうのを PascalCase（パスカルケース）と呼ぶよ。
これは [Pascal](https://ja.wikipedia.org/wiki/Pascal) というプログラミング言語が語源になっているんだ 🤓

コンポーネントは、そのまま要素みたいに描画することができるよ 🙂

```javascript
const HelloWorld = () => {
  return <h1>Hello, World!</h1>;
};

ReactDOM.render(<HelloWorld />, document.getElementById("root"));
```

コンポーネントから他のコンポーネントを描画することもできるよ 😲

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

普通の関数のパラメータみたいに受け取って使うことができる 😄

```javascript
const HelloWorld = (props) => {
  return <h1>Hello, {props.name}!</h1>;
};

// props は、属性としてコンポーネントに渡すことができる
ReactDOM.render(<HelloWorld name="World" />, document.getElementById("root"));
```

気をつけなきゃいけないのは、props は読み取り専用だってこと 🤭

```javascript
const HelloWorld = (props) => {
  props.name = "World"; // これやっちゃダメ！
  return <h1>Hello, {props.name}!</h1>;
};
```

## state（ステート）

props と違って [state](https://ja.reactjs.org/docs/state-and-lifecycle.html) と呼ばれるものを使うことで、コンポーネントに変更可能な変数を持たせることができるんだ 😄

state は[`React.useState()`](https://ja.reactjs.org/docs/hooks-reference.html#usestate)という関数を使って作ることができるよ。
この関数は現在のステートと、そのステートを変えるための関数を返すんだ 🙂

```javascript
// state は現在のステート
// setState はステートを変える関数
// initialState はステートの最初の値
// それぞれの名前は好きに変えていいよ！
const [state, setState] = React.useState(initialState);
```

例えば下のように`setState`の方（この例では`setIsHiding`という名前）に次の state を渡すことで、state を変えることができる 👀

```javascript
const Peekaboo = () => {
  // React.useState に true を渡しているから、最初は isHiding が true になる
  const [isHiding, setIsHiding] = React.useState(true);
  return (
    <button
      type="button"
      onClick={() => {
        // isHiding を false に変えよう！
        setIsHiding(false);
      }}
    >
      {isHiding ? "🙈いないいない" : "🐵ばあ！"}
    </button>
  );
};

ReactDOM.render(<Peekaboo />, document.getElementById("root"));
```

もし次の state を計算するのに今の state が必要な場合は、[`setState`に関数を渡した方がいいよ](https://ja.reactjs.org/docs/hooks-reference.html#functional-updates)。
`setState`に関数を渡した場合、現在の state をパラメータとして受け取れるから、それを使って次の state を計算することができるんだ 😲

例えば下の例では、ボタンを押すごとに`isHiding`が反転するようになるよ 😄

```javascript
const Peekaboo = () => {
  const [isHiding, setIsHiding] = React.useState(true);
  return (
    <button
      type="button"
      onClick={() => {
        // setIsHiding に関数を渡すと、前の state を受け取れる
        // 次の state を返すことで、state を変えよう
        // prev は previous（「前の」という意味）の略として、React ではよく使われるよ
        setIsHiding((prevIsHiding) => !prevIsHiding);
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
