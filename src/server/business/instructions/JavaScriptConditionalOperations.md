# JavaScript の条件分岐

## if 文

`if`を使うと、ある条件下でしか実行しないコードを書けるよ 😊

```javascript
const x = 100;
if (x === 100) {
  console.log("xは100！");
}
```

一段とプログラミングっぽくなってきたね 😆

`x`の値を`100`以外にすると、`xは100！`と表示されなくなるから試してみて 👀

`if`の後に`else`をつけると、`if`の条件を満たさない場合だけに走るコードを書くこともできるよ！

```javascript
const x = 100;
if (x === 100) {
  console.log("xは100！");
} else {
  console.log("xは100じゃない！");
}
```

`else`の代わりに`else if`とすると、最初の`if`の条件を満たさない上に、`else if`の条件を満たす場合だけに走るコードを書くこともできるよ！

```javascript
const x = 100;
if (x === 100) {
  console.log("xは100！");
} else if (x % 2 === 0) {
  console.log("xは偶数！");
}
```

これらを全部組み合わせることも出来るんだ。

```javascript
const x = 100;
if (x === 100) {
  console.log("xは100！");
} else if (x % 2 === 0) {
  console.log("xは偶数！");
} else {
  console.log("xは偶数じゃない！");
}
```

```javascript
const x = 100;
if (x === 100) {
  console.log("xは100！");
}
// この例では else if じゃなくて if を使っているので、
// 上の if と下の if は独立した別物
// x が 100 の場合も"xは偶数！"と表示される
if (x % 2 === 0) {
  console.log("xは偶数！");
} else {
  console.log("xは偶数じゃない！");
}
```

## switch 文
