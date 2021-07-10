# ファイルとしての CSS

実際にウェブサイトを作るとなると、色々なファイルを管理することになるね。

もちろん`<style>`を使って HTML のファイルの中に CSS を書くこともできるんだけど、
もし CSS を独立したファイルとして扱いたい場合は、違うファイルに分けておくこともできるよ 🤗

## \<link>（他のファイルを読み込む）

HTML に CSS ファイルを読み込みたい時は、`<link>`を使うといいよ。
下の例では[Bootstrap](https://getbootstrap.com)という有名な CSS ライブラリ（再利用できるソフトウェア）を読み込んでいるよ 🙂

右の HTML エディタで試してみて！（CSS エディタじゃないよ！CSS エディタは後で使うからね 😊）

```html
<link
  rel="stylesheet"
  href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
/>
```

あ、CSS を読み込んだだけじゃ何も表示されないね 😂
読み込んだ CSS を使って、ボタンを表示してみよう 👀

```html
<link
  rel="stylesheet"
  href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
/>
<button class="btn btn-primary">ボタン</button>
```

青いボタンが表示されたら成功だよ 👏
読み込んだ CSS 中に`btn`クラスと`btn-primary`クラス向けのスタイルが書かれていたから、
それが適応されたんだね。

`<link>`要素を消すと、普通のボタンに戻るよ 🙂

## CSS ファイルの中身

CSS ファイルの中身は、`<style>`要素の中身と同じだよ。
だからどっちを使っても結果は同じ。好きな方を使ってね 😊

右の CSS エディタの中に CSS を書くと、その CSS をファイルとして読み込んだのと同じ効果が得られるよ。
試してみて！

```html
<h1>見出し</h1>
```

```css
h1 {
  background-color: green;
}
```
