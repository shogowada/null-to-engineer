# 初めての JavaScript

まずは右のコードエディタに下の文字列を入力して、「実行」のボタンを押してみて！

```javascript
console.log("Hello, World!");
```

出力画面に`Hello, World!`と表示されたはず 👀

`console.log()`は渡したものを表示するので、このコードは`Hello, World!`と表示したんだね。
他の文字列を渡すと、その文字列を表示してくれるよ。試してみて 🥳

二つ以上の文字列をくっつけることもできるよ。`+`を使う方法と、`` `${}` ``を使う方法があるよ。

```javascript
const world = "World";
console.log("Hello, " + world + "!");
console.log(`Hello, ${world}!`);
```

`${}`を使う場合、`"`じゃなくて`` ` ``で文字列を囲まなきゃいけないから注意してね！

## コメント

`//`と書くと、その後に続くコードは全部無視されるんだ。`/**/`と書くと、`/*`と`*/`に囲まれたコードは全部無視される。

これは「コメント」と言って、人間にとって便利なことをコメントとして書いておけるんだ。

```javascript
// この文字列は実行されないし
/*
この文字列も実行されない。
この書き方だと、複数行にわたるコメントも書けるね👍
*/
console.log("Hello, World!"); // こうやって、実行されるコードの後ろに書くこともできるよ！
```

コメントには何を書いてもプログラムに影響されないので、安心だね ☺️

## 変数

文字列は、「変数」と呼ばれる物に覚えておいてもらうこともできるんだ。

```javascript
const text = "Hello, World!";
console.log(text);
```

上のコードでは`text`という変数に、`Hello, World!`という文字列を覚えてもらってるね。
実行すると、同じように`Hello, World!`と表示されたはず。

## 数字

変数には数字を入れることもできるし、それを使って計算もできるよ！

```javascript
const a = 1;
const b = 2;
console.log(`a + b = ${a + b}`);
console.log(`a - b = ${a - b}`);
```

## ブーリアン（はい・いいえ）

はい・いいえ、オン・オフしかない場合は、ブーリアンを使うことができるよ。

```javascript
const a = true;
const b = false;
console.log(`a: ${a}`);
console.log(`b: ${b}`);
```

## オブジェクト

いくつかの値を一つの「オブジェクト」と呼ばれるものに覚えてもらうこともできるよ。便利だね！

```javascript
const person = {
  name: "Mercury Veca",
  age: 20,
};
console.log(`${person.name}は${person.age}才です！`);
```

## 関数

関数を使うと、一度書いたコードを何度も使うことができるよ。

```javascript
const introduce = (person) => {
  console.log(`${person.name}は${person.age}才です！`);
};

const person = {
  name: "Mercury Veca",
  age: 20,
};
introduce(person);
```

`return`を使うと、一つだけ何かを返すこともできるんだ。

```javascript
const getIntroduction = (person) => {
  // console.logを使わずに、returnを使って文字列を返してるよ！
  return `${person.name}は${person.age}才です！`;
};

const person = {
  name: "Mercury Veca",
  age: 20,
};
// 返された文字列をconsole.logを使って表示しよう！
console.log(getIntroduction(person));
```

## 配列

配列を使うと、いくつかの値（要素）を列にして覚えてもらうことができるよ。

```javascript
const introduce = (person) => {
  console.log(`${person.name}は${person.age}才です！`);
};

const people = [
  { name: "Mercury Veca", age: 20 },
  { name: "Karpos Boris", age: 15 },
];
// []を使って要素を取りだそう！
// 0を使うと最初の要素、1を使うと二つ目の要素を取り出せるよ。
introduce(people[0]);
introduce(people[1]);
```
