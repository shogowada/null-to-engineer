# JavaScript と HTML 🧐

多くのウェブサイトは JavaScript、HTML、CSS を組み合わせて作られているよ。
HTML と CSS の組み合わせはもう学んだけど、JavaScript と HTML の組み合わせはまだだね！

JavaScript と HTML を組み合わせることによって、ただ決まった HTML を表示するだけ（静的ページ）じゃなくて、
人（ユーザー）の入力によって表示する HTML を変えるサイト（動的ページ）を作ることができるんだ 🤯

おもしろそうだね！一緒に学んでいこう 😄

## イベント

ユーザーがウェブサイトで何かをする度に、「イベント」と呼ばれるものが発生するよ。
それぞれのイベントが発生したときに JavaScript で書いたコードを走らせることによって、
動的なウェブサイトを作ることができるんだ 😄

例えば、ボタンを押すと[`click`](https://developer.mozilla.org/ja/docs/Web/API/Element/click_event)というイベントが発生する。
それに反応することによって、ボタンを押すと何かが起こるウェブサイトを作ることができるよ 😊

```html
<button id="my-button">ボタン</button>
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
