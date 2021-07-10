# 要素としての CSS

CSS は属性として指定すると、同じスタイルを持った要素を何個も作りたいときは同じことを何度も書かなきゃいけなくなるね 🧐

```html
<h1 style="background-color: green;">最初の見出し</h1>
<h1 style="background-color: green;">次の見出し</h1>
<h1 style="background-color: green;">最後の見出し</h1>
```

これを防ぐために、`<style>`という要素を使って全体に当てはまるスタイルを指定することができるよ 😲

## \<style>（CSS）

`<style>`の中に書かれる CSS では、どの要素にその CSS を適応するかを書かなきゃいけないね。

下の例では、`h1`の要素にだけ`background-color: green;`を適応しているよ 🙂

```html
<style>
  h1 {
    background-color: green;
  }
</style>
<h1>最初の見出し</h1>
<h1>次の見出し</h1>
<h1>最後の見出し</h1>
```

この`h1`の部分は「セレクタ」と呼ばれているんだ 😊
何に宣言を適応させるかセレクト（選択）するから、セレクタだね。

複数の宣言を適応させたい場合は、`{}`の中に複数書くといいよ 👍

```html
<style>
  h1 {
    background-color: green;
    color: white;
  }
</style>
<h1>最初の見出し</h1>
<h1>次の見出し</h1>
<h1>最後の見出し</h1>
```
