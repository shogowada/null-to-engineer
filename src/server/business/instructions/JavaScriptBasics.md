# 初めての JavaScript

## Hello, World!

まずは右のコードエディタに下の文字列を入力して、「実行」のボタンを押してみて！

```javascript
console.log("Hello, World!");
```

出力画面に`Hello, World!`と表示されたかな 👀
おめでとう、初めて JavaScript でプログラムを書いたね！

`console.log()`は渡したものを表示するので、このコードは`Hello, World!`と表示したんだね。
他の文字列を渡すと、その文字列を表示してくれるよ。試してみて 🥳

後ろについてる`;`は行の最後に付くおまじないみたいなもの。機械がコードを読むときに使うだけだから、深い意味はないよ。

## コメント

`//`と書くと、その後に続くコードは全部無視されるんだ。`/**/`と書くと、`/*`と`*/`に囲まれたコードは全部無視される。

これは「コメント」と言って、人間にとって便利なことをコメントとして残しておけるんだ。

```javascript
// この文字列は実行されないし
/*
この文字列も実行されない。
この書き方だと、複数行にわたるコメントも書けるね👍
*/
console.log("Hello, World!"); // コードの後ろに書くこともできるよ！
```

コメントには何を書いてもプログラムに影響されないので、安心だね ☺️

## 文字列

二つ以上の文字列をくっつけることもできるよ。`` `${}` ``を使う方法と、`+`を使う方法があるんだ。

```javascript
console.log(`Hello, ${"World"}!`); // Hello, World!
console.log("Hello, " + "World!"); // Hello, World!
```

二行とも`Hello, World!`と表示されたはず。

`${}`を使う場合、`"`じゃなくて`` ` ``で文字列を囲まなきゃいけないから注意してね！
「何でこんなことするんだ？」と思うかもしれないけど、後で変数とか勉強するときに役に立つよ 😄

## 数字

数字を使って計算もできるよ！

```javascript
console.log(3 + 2); // 5
console.log(3 - 2); // 1
console.log(3 * 2); // 6
console.log(3 / 2); // 1.5
// %は割り算の余りを計算するよ
console.log(3 % 2); // 1
```

`()`を使って優先的に計算する場所を指定することもできるよ。

```javascript
console.log(1 + 2 * 3); // 7
console.log((1 + 2) * 3); // 9
```

## ブーリアン

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

二つの値を比較してブーリアンを作ることもできるんだ。

```javascript
// === を使うと、値が同じ場合にtrueになるよ
console.log(1 === 1); // true
console.log(1 === 2); // false
console.log("abc" === "abc"); // true
console.log("abc" === "ABC"); // false
// !== を使うと、値が違う場合にtrueになるよ
console.log(1 !== 1); // false
console.log(1 !== 2); // true
console.log("abc" !== "abc"); // false
console.log("abc" !== "ABC"); // true
// > を使うと、左辺の方が右辺より大きい場合にtrueになるよ
console.log(1 > 1); // false
console.log(2 > 1); // true
// < を使うと、左辺の方が右辺より小さい場合にtrueになるよ
console.log(1 < 1); // false
console.log(1 < 2); // true
// >= を使うと、左辺の方が右辺より大きいか同じな場合にtrueになるよ
console.log(1 >= 1); // true
console.log(2 >= 1); // true
console.log(1 >= 2); // false
// <= を使うと、左辺の方が右辺より小さいか同じな場合にtrueになるよ
console.log(1 <= 1); // true
console.log(2 <= 1); // false
console.log(1 <= 2); // true
```

## 変数

値は「変数」と呼ばれる物に覚えておいてもらうこともできるんだ。

下の例で出てくる`const`は変数を宣言するときに使うおまじないのようなものだから、覚えてね ✨

```javascript
const text = "Hello, World!"; // textという変数をconstで宣言
console.log(text);
```

上のコードでは`text`という変数に、`Hello, World!`という文字列を覚えてもらってるね。実行すると`Hello, World!`と表示される。

他にも`let`で変数を宣言する場合もあるよ。
`const`で宣言された変数は値を変えらえないのに対して、`let`で宣言された変数は値を変えられるよ。

例えば、下のコードは`const`で`text`を宣言しているので、その値を変えようとしたらエラーになる。
エラーと言っても大したことじゃないから、試してみて！

```javascript
const text = "変わらないものもある";
text = "これ、エラーになる！";
```

`TypeError: Assignment to constant variable.`という感じのエラーメッセージを見れたかな？
細かい言い回しはブラウザによって変わるんだけど、このエラーは`const`で宣言された変数の値を変えようとすると出るんだ。

「エラーメッセージって何だか怖い！よく分からない！」と思った？安心して！
今後エラーメッセージが出たら、インターネットでエラーメッセージを直接検索してみるといいよ 🔎
何年もプログラミングをやっていても、みんなエラーメッセージが出るたびに検索して原因を探るものなんだ ☺️

この場合、エラーを避ける方法は２つある。もう一つ変数を宣言する方法と、`let`で変数を宣言する方法。

もう一つ変数を宣言すると、下のようなコードになる。

```javascript
const text = "変わらないものもある";
console.log(text); // 変わらないものもある
const text2 = "これだとエラーにならない！";
console.log(text2); // これだとエラーにならない！
```

`const`の代わりに`let`で`text`を宣言すると、値を変えることができる。

```javascript
let text = "変わらないものもある";
console.log(text); // 変わらないものもある
text = "あ、変わっちゃった！";
console.log(text); // あ、変わっちゃった！
```

## オブジェクト

いくつかの値を一つの「オブジェクト」と呼ばれるものにまとめて覚えてもらうこともできるよ。

```javascript
// {}を使ってオブジェクトを作ろう！
const person = {
  name: "Mercury Veca",
  age: 20,
};
// .を使ってオブジェクトが持っている値を取りだそう！
console.log(`${person.name}は${person.age}才です！`); // Mercury Vecaは20才です！
```

## 関数

関数を使うと、一度書いたコードを何度も使うことができるよ。
関数は`() => {}`で作ることができるんだ。`{}`の中はコードを書けるよ。
文字列や数字と同じように、作った関数は変数に覚えておいてもらうことができる 👍

```javascript
const introduce = () => {
  const person = {
    name: "Mercury Veca",
    age: 20,
  };
  console.log(`${person.name}は${person.age}才です！`);
};

introduce(); // ()を使って関数を呼ぼう！
introduce(); // もう一度呼ぼう！同じコードを何度も使いまわせるよ。
```

関数は変数を受け取ることもできるよ。受け取った変数は「パラメータ」と呼ばれるんだ。下の例では`person`というパラメータを受け取っているね。

```javascript
const introduce = (person) => {
  console.log(`${person.name}は${person.age}才です！`);
};

const personA = {
  name: "Mercury Veca",
  age: 20,
};
const personB = {
  name: "Karpos Boris",
  age: 15,
};
introduce(personA); // Mercury Vecaは20才です！
introduce(personB); // Karpos Borisは15才です！
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
introduce(person.name, person.age); // Mercury Vecaは20才です！
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
console.log(createIntroduction(person)); // Mercury Vecaは20才です！
```

## 配列

配列を使うと、いくつかの値を列にして覚えてもらうことができるよ。配列に覚えてもらっている値は、「要素」と呼ばれることがあるよ。

```javascript
const introduce = (person) => {
  console.log(`${person.name}は${person.age}才です！`);
};
// []を使って配列を作ろう！
// 各要素は,を使って区切ってね。
const people = [
  { name: "Mercury Veca", age: 20 },
  { name: "Karpos Boris", age: 15 },
];
// []を使って要素を取りだそう！
// 0を使うと最初の要素、1を使うと二つ目の要素を取り出せるよ。
introduce(people[0]); // Mercury Vecaは20才です！
introduce(people[1]); // Karpos Borisは15才です！
```

## クラス

クラスを使うと、同じ機能を持ったオブジェクトを何度も作ることができるよ。

```javascript
class Person {
  // constructorという特別な関数を使って、クラスを初期化できるよ
  constructor(name, age) {
    // thisを使ってクラスが持っている値にアクセスしよう
    this.name = name;
    this.age = age;
  }

  introduce() {
    // JavaScriptのthisはややこしい仕様になってるんだけど、
    // 今のところは「thisを使ってこのクラスが持っている値や関数にアクセス」と覚えておけばOK👍
    console.log(`${this.name}は${this.age}才です！`);
  }
}

// classはnewで宣言
// newで渡した値は、そのclassのconstructorに渡されるよ
const personA = new Person("Mercury Veca", 20);
const personB = new Person("Karpos Boris", 15);
personA.introduce(); // Mercury Vecaは20才です！
personB.introduce(); // Karpos Borisは15才です！
```
