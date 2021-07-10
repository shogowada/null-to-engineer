# 初めての CSS

## CSS って何だ？

CSS（Cascading Style Sheets）は、HTML の要素をどうやって表示するかを指定するものだよ 🙂

例えば色々な要素の色や大きさ、配置を変えたりすることができるんだ 🎨

## 色を変えてみる

CSS は要素の`style`属性として指定することができるよ。下の例を実行してみよう 👀

```html
<h1 style="background-color: green;">目立つ見出し</h1>
```

CSS は名前（プロパティ）と値の組になっていて、`:`で区切られている。最後に`;`がつくのは JavaScript と同じだね 👍

この場合は`background-color`という背景の色を指定するプロパティに`green`を指定したから、見出しの背景が緑になったんだ。

組は何個でも続けて書けるよ！

```html
<h1 style="background-color: green; color: white;">目立つ見出し</h1>
```

`color`は文字の色を指定するから、文字の色が白になったら成功だよ 👏
