# 初めての JavaScript

まずは右のコードエディタに下の文字列を入力して、「実行」のボタンを押してみて！

```javascript
console.log("Hello, World!");
```

出力画面に`Hello, World!`と表示されたはず 👀

`console.log()`は渡したものを表示するので、このコードは`Hello, World!`と表示したんだね。
他の文字列を渡すと、その文字列を表示してくれるよ。試してみて 🥳

二つ以上の文字列をくっつけることもできるよ。`` `${}` ``を使う方法と、`+`を使う方法があるよ。

```javascript
console.log(`Hello, ${"World"}!`);
console.log("Hello, " + "World!");
```

`${}`を使う場合、`"`じゃなくて`` ` ``で文字列を囲まなきゃいけないから注意してね！
「何でこんなことするんだ？」と思うかもしれないけど、後で変数とか勉強するときに役に立つよ 😄

## コメント

`//`と書くと、その後に続くコードは全部無視されるんだ。`/**/`と書くと、`/*`と`*/`に囲まれたコードは全部無視される。

これは「コメント」と言って、人間にとって便利なことをコメントとして残しておけるんだ。

```javascript
// この文字列は実行されないし
/*
この文字列も実行されない。
この書き方だと、複数行にわたるコメントも書けるね👍
*/
console.log("Hello, World!"); // こうやって、実行されるコードの後ろに書くこともできるよ！
```

コメントには何を書いてもプログラムに影響されないので、安心だね ☺️

## 数字

数字を使って計算もできるよ！

```javascript
console.log(`3 + 2 = ${3 + 2}`); // 5
console.log(`3 - 2 = ${3 - 2}`); // 1
console.log(`3 * 2 = ${3 * 2}`); // 6
console.log(`3 / 2 = ${3 / 2}`); // 1.5
// %は余りを計算するよ
console.log(`3 % 2 = ${3 % 2}`); // 1
```

## ブーリアン（はい・いいえ）

はい・いいえ、オン・オフしかない場合は、ブーリアンを使うことができるよ。

```javascript
console.log(true);
console.log(false);
```

`&&`（アンド）を使うと、二つとも`true`な場合だけ`true`になるよ。

```javascript
console.log(true && true); // true
console.log(true && false); // false
console.log(false && true); // false
console.log(false && false); // false
```

`||`（オア）を使うと、どちらかが`true`な場合に`true`になるよ。

```javascript
console.log(true || true); // true
console.log(true || false); // true
console.log(false || true); // true
console.log(false || false); // false
```

組み合わせることもできるよ！

```javascript
console.log(true && true && true); // true
console.log(false || false || true); // true
// ()で囲まれた処理は優先的に実行される
console.log((true || false) && true); // true
```

`!`をつけると反転するよ。

```javascript
console.log(!true); // false
console.log(!false); // true
console.log(!(true && true)); // false
console.log(!false && !false); // true
```

## 変数

値は「変数」と呼ばれる物に覚えておいてもらうこともできるんだ。

下の例で出てくる`const`は変数を宣言するときに使うおまじないのようなものだから、覚えてね ✨

```javascript
const text = "Hello, World!";
console.log(text);
```

上のコードでは`text`という変数に、`Hello, World!`という文字列を覚えてもらってるね。実行すると`Hello, World!`と表示される。

他にも`let`や`var`で変数を宣言する場合もあるよ。
`const`で宣言された変数は値を変えらえないのに対して、`let`や`var`で宣言された変数は値を変えられるよ。

例えば、下のコードは`const`で`text`を宣言しているので、その値を変えようとしているからエラーになる。

```javascript
const text = "変わらないものもある";
text = "これ、エラーになる！";
```

下のコードは`let`で`text`を宣言しているので、エラーにならない！

```javascript
let text = "変わらないものもある";
console.log(text);
text = "あ、変わっちゃった！";
console.log(text);
```

上のコードは`let`じゃなくて`var`を使っても同じ結果になるよ。
`let`と`var`には細かい違いがあるんだけど、今のところは「`let`を使えば問題ない」と覚えておけば大丈夫 👍

## オブジェクト

いくつかの値を一つの「オブジェクト」と呼ばれるものに覚えてもらうこともできるよ。データをまとめられて便利だね！

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
const introduce = () => {
  // 関数は() => {}で宣言できるよ！
  const person = {
    name: "Mercury Veca",
    age: 20,
  };
  console.log(`${person.name}は${person.age}才です！`);
};

introduce(); // ()を使って関数を呼ぼう！
introduce(); // もう一度呼ぼう！
```

関数は変数を受け取ることもできるよ。受け取った変数は「パラメータ」と呼ばれるんだ。下の例では`person`というパラメータを受け取っているね。

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

パラメータは何個でも受け取れるよ。下の例では`name`と`age`の二つのパラメータを受け取っているね。

```javascript
const introduce = (name, age) => {
  console.log(`${name}は${age}才です！`);
};

const person = {
  name: "Mercury Veca",
  age: 20,
};
introduce(person.name, person.age);
```

`return`を使うと、一つだけ何かを返すこともできるんだ。

```javascript
const createIntroduction = (person) => {
  // console.logを使わずに、returnを使って文字列を返してるよ！
  return `${person.name}は${person.age}才です！`;
};

const person = {
  name: "Mercury Veca",
  age: 20,
};
// 返された文字列をconsole.logを使って表示しよう！
console.log(createIntroduction(person));
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
