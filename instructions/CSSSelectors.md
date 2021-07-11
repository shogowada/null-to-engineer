# CSS セレクタ

CSS セレクタを使って、スタイルを適応する要素を選択することができるよ 🙂

## 要素形セレクタ

要素名で選択するセレクタのことを「要素型セレクタ」または「タイプセレクタ」と呼ぶよ。
今までの例で使っていたやつだね！

```html
<style>
  h1 {
    background-color: green;
  }
  h2 {
    background-color: blue;
  }
</style>
<h1>大きめの見出し</h1>
<h2>小さめの見出し</h2>
```

## クラスセレクタ

クラスセレクタを使うと、HTML で指定した要素にだけスタイルを適応することができるよ 🙂

クラスセレクタは`.`の後にクラス名を書くことで作ることができる。
そして同じ名前の`class`属性を持った要素にだけ適応されるんだ 👍

```html
<style>
  .primary-background {
    background-color: green;
  }
  .secondary-background {
    background-color: blue;
  }
  .light-text {
    color: white;
  }
</style>
<h1 class="primary-background">見出し</h1>
<p class="primary-background">段落</p>
<h1 class="secondary-background light-text">見出し２</h1>
<p class="secondary-background light-text">段落</p>
```

## ID セレクタ

「このたった一つの特別な要素にだけスタイルを適応したい！」という場合は、ID セレクタを使うといいよ 🙂
同じ ID は一つだけしか使っちゃだめだから、とても特別な要素に対して使うことになるね。

ID セレクタは`#`の後に ID 名を書くことで作れる。
同じ名前の`id`属性を持った要素に適応されるよ。

```html
<style>
  #main-header {
    background-color: green;
  }
</style>
<h1 id="main-header">メインの見出し</h1>
```

## 属性セレクタ

「こういう属性を持ってる要素にスタイルを適応したい！」という場合は、属性セレクタを使えるね 🤗

`[`と`]`で属性の名前を囲むと、その属性を持った要素が選択されるんだ。
`[name="value"]`という風にすると、属性の値を選ぶこともできるよ 🙂

```html
<style>
  [disabled] {
    background-color: white;
    color: gray;
  }
  [type="submit"] {
    background-color: green;
    color: white;
  }
</style>
<button type="button">普通のボタン</button>
<button type="button" disabled>押せないボタン</button>
<button type="submit">送信ボタン</button>
```

他にも色々な値の選び方があるから、
気になったら[MDN のドキュメント](https://developer.mozilla.org/ja/docs/Web/CSS/Attribute_selectors#syntax)を見てみてね！

## 疑似クラス

疑似クラスを使うと、要素が特別な状態になった場合にのみスタイルを適応することができるよ 🤔
その説明だけじゃちょっと分かりにくいね！

疑似クラスは`:`を使うことで書くことができるんだけど、例えば下の例だと、`button`の後ろに[`:hover`](https://developer.mozilla.org/en-US/docs/Web/CSS/:hover)と付いてるね。
`:hover`が付いたスタイルはマウスポインタが当たったときだけに適応されるから、
この場合はボタンの上をマウスポインタが通ったときだけにスタイルを適応することができるんだ 😲

```html
<style>
  button:hover {
    background-color: green;
    color: white;
  }
</style>
<button type="button">マウスでホバーしてみて🖱</button>
```

もちろん、`:hover`意外にも色々あるよ！
気になったら[MDN のドキュメント](https://developer.mozilla.org/ja/docs/Web/CSS/Pseudo-classes#index_of_standard_pseudo-classes)を見てね 👍

## 疑似要素

疑似要素を使うと、選択された要素の特定の部分にだけスタイルを適応することができるよ 🤔
これもちょっと分かりづらいね！例を見てみようか 👀

疑似要素は`::`を使うことで書くことができる。
例えば下の例だと[`::before`](https://developer.mozilla.org/ja/docs/Web/CSS/::before)と[`::after`](https://developer.mozilla.org/ja/docs/Web/CSS/::after)があるね。
`::before`を使うことで選択された要素の前に、`::after`を使うことで選択された要素の後にスタイルを適応することができるんだ。

この場合は[`content`プロパティ](https://developer.mozilla.org/ja/docs/Web/CSS/content)で新しい要素を追加しているね 😲

```html
<style>
  h1::before {
    content: "😆";
  }
  p::after {
    content: "🤪";
  }
</style>
<h1>beforeは前</h1>
<p>afterは後</p>
```

HTML の方には何も書いてないのに、CSS が適応されて絵文字が表示されてる！すごい 🤯

疑似要素も他にも色々あるから、気になったら[MDN のドキュメント](https://developer.mozilla.org/ja/docs/Web/CSS/Pseudo-elements#index_of_standard_pseudo-elements)を見てみて！

## 組み合わせ

これら全てのセレクタを組み合わせて使うこともできるよ 😎

例えば「`<h1>`要素がこのクラスを持ってたらこのスタイル、`<p>`要素がこのクラスを持ってたらこのスタイル」という風に、
要素とクラスの組み合わせで選択することもできるよ 🧐

そういう場合は、要素型セレクタのすぐ次にクラスセレクタを書くんだ ✍️
セレクタの間にスペースを入れちゃだめだよ！

```html
<style>
  h1.primary-background {
    background-color: green;
  }
  p.primary-background {
    background-color: yellow;
  }
  .light-text {
    color: white;
  }
</style>
<h1 class="primary-background light-text">見出し</h1>
<p class="primary-background">段落</p>
```

同じ`primary-background`クラスを持っているのに、要素が違うから違うスタイルが適応されたね 👀

セレクタの間にスペースを入れると、子孫関係がある場合にのみ適応されるようになるよ。
例えば「`<p>`要素の中にある`<button>`要素だけにスタイルを適応したい」という場合は、
下のように書くといいよ 😄

```html
<style>
  p button {
    background-color: green;
  }
</style>
<p>
  段落の中に<button type="button">ボタン</button>がある！<br />
  スタイルが適応されたかな？
</p>
段落の外にも<button type="button">ボタン</button>がある！<br />
こっちはスタイルが適応されていないね。
```
