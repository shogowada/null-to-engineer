# CSS セレクタ

## 要素形セレクタ

指定された全ての要素に適応するセレクタのことを「要素型セレクタ」または「タイプセレクタ」と呼ぶよ。

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

「その要素全部じゃなくて、一部だけにスタイルを適応したい！」という場合は、クラスセレクタを使うのが便利だよ 🙂

クラスセレクタは、要素と切り離しても使えるんだ。クラスは各要素に`class`属性で指定できるよ。

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

「この要素だけにスタイルを適応したい！」という場合は、ID セレクタを使うといいよ 🙂
ID は一つだけ

```html
<style></style>
<h1></h1>
```

## ステートセレクタ

## 属性セレクタ

## 組み合わせ

「この要素がこのクラスを持ってたらこのスタイル、この要素がこのクラスを持ってたらこのスタイル」という風に、
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
  h1.secondary-background {
    background-color: blue;
  }
  p.secondary-background {
    background-color: purple;
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
