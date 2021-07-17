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
