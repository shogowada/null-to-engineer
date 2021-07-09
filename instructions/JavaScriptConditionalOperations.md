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

一つの値によって違うコードを実行したい場合、`switch`文が便利だよ。

```javascript
const language = "Japanese";
// languageの値によって、違うコードが実行される
switch (language) {
  case "Japanese": {
    // languageが"Japanese"ならこのコード
    console.log("こんにちは");
    break;
  }
  case "English": {
    // languageが"English"ならこのコード
    console.log("Hello");
    break;
  }
  case "Spanish": {
    // languageが"Spanish"ならこのコード
    console.log("Hola");
    break;
  }
}
```

`case`の後の`:`を忘れないようにね！あと`break`を忘れると、次の`case`のコードまで実行されちゃうから注意！

```javascript
const language = "Japanese";
switch (language) {
  case "Japanese": {
    console.log("こんにちは");
    // ここでbreak忘れちゃった！
  }
  case "English": {
    // languageが"Japanese"でも、このコードまで実行されちゃう！
    console.log("Hello");
    break;
  }
}
```

「何で！？」と思うかもしれないけど、これをうまく利用することもできるよ。

```javascript
const language = "Japanese";
switch (language) {
  case "Japanese":
  case "日本語": {
    // languageが"Japanese"でも"日本語"でも、このコードが実行される
    console.log("こんにちは");
    break;
  }
  case "English": {
    console.log("Hello");
    break;
  }
  case "Spanish":
  case "español": {
    console.log("Hola");
    break;
  }
}
```

どの`case`にも当てはまらないときに実行したいコードがある場合、`default`を使うといいよ。

```javascript
const language = "Japanese";
switch (language) {
  case "Japanese": {
    console.log("こんにちは");
    break;
  }
  case "Spanish": {
    console.log("Hola");
    break;
  }
  default: {
    // どのcaseにも当てはまらない場合、このコードが実行される
    // 当然、languageが"English"の場合もこのコードが実行される👍
    console.log("Hello");
    break;
  }
}
```

## Truthy と falsy ？

JavaScript では以下の値は全て「falsy」と言われて、`if`文の中では`false`と同じ扱いになるよ。
逆に言えば、それ以外の値は「truthy」と言われて、`if`文の中では`true`と同じ扱いになるんだね 😲

```javascript
if (false) {
  console.log("実行されない");
}
if (0) {
  console.log("実行されない");
}
if (-0) {
  console.log("実行されない");
}
if (0n) {
  console.log("実行されない");
}
if ("") {
  console.log("実行されない");
}
// nullは「値が存在しない」ことを示す特別な値。
if (null) {
  console.log("実行されない");
}
// undefinedは「値が定義されていない」ことを示す特別な値。
// 「nullと何が違うの？」と思った？安心して☺️
// JavaScript何年もやってる人でも「なんで両方あるんだややこしい！」と思ってるから！
if (undefined) {
  console.log("実行されない");
}
// NaNはNot a Numberの略。「数値じゃない」ことを示す値だね。
// 例えば文字列を数値で割ろうとすると（例："hello" / 3）、NaNになるよ。
if (NaN) {
  console.log("実行されない");
}
```

詳しく知りたい人は、[MDN のドキュメント](https://developer.mozilla.org/ja/docs/Glossary/Falsy)を見てみて！
