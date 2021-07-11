# ファイルとしての CSS

実際にウェブサイトを作るとなると、色々なファイルを管理することになるね。

もちろん`<style>`を使って HTML のファイルの中に CSS を書くこともできるんだけど、
もし CSS を独立したファイルとして扱いたい場合は、違うファイルに分けておくこともできるよ 🤗

## \<link>（ファイルを読み込む）

HTML に CSS ファイルを読み込むときは、`<link>`を使うといいよ。

例えば下の例では`btn`クラスも`btn-primary`クラスも宣言されてないから普通のボタンが表示されるんだけど、

```html
<button class="btn btn-primary">ボタン</button>
```

[Bootstrap](https://getbootstrap.com) という有名な CSS ライブラリ（再利用できるソフトウェア）を読み込むと、
Bootstrap の中に定義されている`btn`クラスと`btn-primary`クラスが読み込まれて、青いボタンが表示されるよ 👀

```html
<link
  rel="stylesheet"
  href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
/>
<button class="btn btn-primary">ボタン</button>
```

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
