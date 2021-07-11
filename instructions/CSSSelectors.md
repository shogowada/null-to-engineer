# CSS セレクタ

CSS セレクタはどの要素にスタイルを適応するか指定することができるよ 🙂

## 要素形セレクタ

指定された要素全てに適応するセレクタのことを「要素型セレクタ」または「タイプセレクタ」と呼ぶよ。
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

`[]`で属性の名前を囲むと、その属性を持った要素に適応されるんだ。
`[name="value"]`という風にすると、属性の値も指定できる 🙂

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

他にも色々な値の指定の仕方があるから、
気になったら[MDN のドキュメント](https://developer.mozilla.org/ja/docs/Web/CSS/Attribute_selectors#syntax)を見てみてね！

## 疑似クラス

疑似クラスを使うと、要素が特別な状態になった場合にのみスタイルを適応することができるよ 🤔
その説明だけじゃちょっと分かりにくいね！

例えば下の例だと、`button`の後ろに`:hover`と付いてるね。
`:hover`が付いたスタイルはマウスポインタが当たったときだけに適応されるから、
ボタンの上をマウスポインタが通ったときだけにスタイルを適応することができるんだ 😲

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

```html
<style></style>
```

## 組み合わせ

これら全てのセレクタを組み合わせて使うこともできるよ 😎

例えば「`<h1>`要素がこのクラスを持ってたらこのスタイル、`<p>`要素がこのクラスを持ってたらこのスタイル」という風に、
要素とクラスの組み合わせで指定することもできるよ 🧐

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

セレクタの間にスペースを入れると、親子関係がある場合にのみ適応されるようになるよ。
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
