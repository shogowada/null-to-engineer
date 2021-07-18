# JavaScript と HTML 🧐

多くのウェブサイトは JavaScript、HTML、CSS を組み合わせて作られているよ。
HTML と CSS の組み合わせはもう学んだけど、JavaScript と HTML の組み合わせはまだだね！

JavaScript と HTML を組み合わせることによって、ただ決まった HTML を表示するだけじゃなくて、
見ている人の入力によって表示する HTML が変わるサイトを作ることができるんだ 🤯

おもしろそうだね！一緒に学んでいこう 😄

## イベント

見ている人（ユーザー）がウェブサイトで何かをする度に「イベント」と呼ばれるものが発生するよ。
そのイベントが発生したときに JavaScript で書いたコードを走らせることによって、
サイトがユーザーの入力に対して何か反応することができるんだ 😄

例えば、ボタンを押すと[`click`](https://developer.mozilla.org/ja/docs/Web/API/Element/click_event)というイベントが発生する。
それに反応することによって、ボタンを押すと何かが起こるウェブサイトを作ることができるよ 😊

```html
<button type="button" id="my-button">ボタン</button>
```

```javascript
// document.getElementById は、与えた ID の要素を返す
const buttonElement = document.getElementById("my-button");

let counter = 0;
// 要素の addEventListener という関数を使うとイベントに反応できる
buttonElement.addEventListener("click", () => {
  counter = counter + 1;
  // innerHTML を使うと、タグに挟まれている HTML を変えられる
  buttonElement.innerHTML = `${counter} 回押した`;
});
```

## JavaScript で要素を作る

HTML じゃなくて、JavaScript を使って新しい要素を作ることもできるんだ 😁

```javascript
// createElement で新しい要素を作る
const divElement = document.createElement("div");
divElement.innerHTML = "Hello, World!";

// document.body はウェブサイトの本体の要素だよ！
// その要素に appendChild で今作った要素を追加してみよう
document.body.appendChild(divElement);
```

もちろん、JavaScript で作った要素にも CSS が適応されるよ！

```css
div {
  background-color: green;
}
```

```javascript
const divElement = document.createElement("div");
divElement.innerHTML = "Hello, World!";

document.body.appendChild(divElement);
```

HTML で作った要素に、JavaScript で作った要素を追加することも 😲

```html
<div id="my-div">HTMLで作った要素</div>
```

```javascript
const divElementCreatedByHTML = document.getElementById("my-div");

const divElementCreatedByJavaScript = document.createElement("div");
divElementCreatedByJavaScript.innerHTML = "JavaScriptで作った要素";
divElementCreatedByHTML.appendChild(divElementCreatedByJavaScript);
```

## もっと簡単な方法

何だか色々なことができそうで楽しいけど、こうやってウェブサイトの仕組みを一つずつ作っていくのはとても大変そうだね 😵‍💫
大丈夫、みんな同じことを思ってるよ 🤗
実際大変過ぎて、もうこうやって作られているウェブサイトはほとんどないんじゃないかな 🤔

こうやってウェブサイトを作るのは本当に大変だから、みんなもっと簡単に作る方法はないかと試行錯誤しているんだ。
その工夫の中で、ウェブサイトをもっと簡単に作るための方法がいくつも産まれた。
その中でも、みんなに再利用できる仕組みを作って公開してくれた人たちがいるんだ 👏

そういう再利用可能なソフトウェアのことを「ライブラリ」や「フレームワーク」と呼ぶよ。
例えば最近では、[React](https://reactjs.org)や[Vue](https://vuejs.org)が[人気](https://2020.stateofjs.com/en-US/technologies/front-end-frameworks/)だね 🙂
どのライブラリを使ってもいいんだけど、次は React を使って簡単なウェブサイトを作ってみようか 🥳
