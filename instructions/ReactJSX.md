# JSX

## JSX って何だ？

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
