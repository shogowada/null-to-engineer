# JavaScript の配列

配列は日々のプログラミングでも沢山使うよ！配列から他の配列を作ったり、一つの値を取り出したり。そのために覚えておいたら便利な方法が色々あるから、見ていこうね ☺️

沢山あるし分かりにくいのもあるから、今全部覚える必要はないよ 😄「こういうこと出来るんだな」というのを知っておいて、必要になったらここにきて思い出して 😊

## 配列に要素を追加

配列に新しい要素を追加したい場合、`[...items, newItem]`という書き方で新しい配列を作ることができるよ。

```javascript
const items = [1, 2, 3];

// 一つだけ新しい値を追加
const newItems = [...items, 4];
console.log(newItems); // [1,2,3,4]

// 二つ新しい値を追加
const newItems2 = [...newItems, 5, 6];
console.log(newItems2); // [1,2,3,4,5,6]

// 一つ、最初に新しい値を追加
const newItems3 = [0, ...newItems2];
console.log(newItems3); // [0,1,2,3,4,5,6]

// 違う配列を全部追加
const itemsToAdd = [7, 8];
const newItems4 = [...newItems3, ...itemsToAdd];
console.log(newItems4); // [0,1,2,3,4,5,6,7,8]

// 新しい配列を作るから、元の配列はそのままだよ！
console.log(items); // [1,2,3]
```

もし元の配列を変えたい場合は、`push`や`splice`といった関数を使うよ。

```javascript
const items = [1, 2, 3];

// 一つだけ新しい値を追加
items.push(4);
console.log(items); // [1,2,3,4]

// 二つ新しい値を追加
items.push(5, 6);
console.log(items); // [1,2,3,4,5,6]

// 一つ、最初に新しい値を追加
// spliceの最初のパラメータはインデックス（どこに値を追加するか）
// 二つ目のパラメータはインデックスから何個要素を消すか
// 三つ目のパラメータは何を追加するか
items.splice(0, 0, 0);
console.log(items); // [0,1,2,3,4,5,6]
```

## filter

`filter`を使うと、元の配列からある条件を満たす要素だけを取り出した、新しい配列を作ることができるんだ。

```javascript
const animals = [
  { name: "dog", class: "mammal" },
  { name: "cat", class: "mammal" },
  { name: "duck", class: "bird" },
];

const mammals = animals.filter((animal) => animal.class === "mammal");
console.log(mammals); // [{"name":"dog","class":"mammal"},{"name":"cat","class":"mammal"}]

const fish = animals.filter((animal) => animal.class === "fish");
console.log(fish); // []

// 新しい配列を作るから、元の配列はそのままだよ！
console.log(animals); // [{"name":"dog","class":"mammal"},{"name":"cat","class":"mammal"},{"name":"duck","class":"bird"}]
```

## find

`find`は`filter`に近いけど、条件を満たした要素全てを返すんじゃなくて、条件を満たした要素一つだけを返すよ。見つからなかった場合は`undefined`という特別な値を返す。

```javascript
const animals = [
  { name: "dog", class: "mammal" },
  { name: "cat", class: "mammal" },
  { name: "duck", class: "bird" },
];

const mammal = animals.find((animal) => animal.class === "mammal");
console.log(mammal); // {"name":"dog","class":"mammal"}

const fish = animals.find((animal) => animal.class === "fish");
console.log(fish); // undefined
```

## map

`map`を使うと、配列の各要素から新しい値を取り出した配列を作ることができる。

```javascript
const animals = [
  { name: "dog", class: "mammal" },
  { name: "cat", class: "mammal" },
  { name: "duck", class: "bird" },
];

const animalNames = animals.map((animal) => animal.name);
console.log(animalNames); // ["dog","cat","duck"]

// 新しい配列を作るから、元の配列はそのままだよ！
console.log(animals); // [{"name":"dog","class":"mammal"},{"name":"cat","class":"mammal"},{"name":"duck","class":"bird"}]
```

## flat

`flat`を使うと、配列の要素が配列だったときに、その配列の要素も全て繋げた一つの配列を作ることができるよ。

```javascript
const items = [1, [2, 3], [4, 5], 6];

const flattenedItems = items.flat();
console.log(flattenedItems); // [1,2,3,4,5,6]

// 新しい配列を作るから、元の配列はそのままだよ！
console.log(items); // [1,[2,3],[4,5],6]
```

## flatMap

`flatMap`は`map`と`flat`を一度に行うよ！

```javascript
const operatingSystemMakers = [
  {
    name: "Microsoft",
    operatingSystems: ["Windows 8", "Windows 10"],
  },
  {
    name: "Apple",
    operatingSystems: ["macOS Mojave", "macOS Catalina"],
  },
];

const operatingSystems = operatingSystemMakers.flatMap(
  (maker) => maker.operatingSystems
);
console.log(operatingSystems); // ["Windows 8","Windows 10","macOS Mojave","macOS Catalina"]

// mapとflatを使っても同じことができるよ
const operatingSystems2 = operatingSystemMakers
  .map((maker) => maker.operatingSystems)
  .flat();
console.log(operatingSystems2); // ["Windows 8","Windows 10","macOS Mojave","macOS Catalina"]

// 新しい配列を作るから、元の配列はそのままだよ！
console.log(operatingSystemMakers); // [{"name":"Microsoft","operatingSystems":["Windows 8","Windows 10"]},{"name":"Apple","operatingSystems":["macOS Mojave","macOS Catalina"]}]
```

## includes

`includes`は配列の中に与えられた値が見つかったら`true`、見つからなかったら`false`を返すよ。

```javascript
const animals = ["dog", "cat", "fish"];

const includesDog = animals.includes("dog");
console.log(includesDog); // true

const includesHamster = animals.includes("hamster");
console.log(includesHamster); // false
```

## some

`some`は`includes`と似てるけど、関数を使って条件を書くことができるんだ。

```javascript
const animals = [
  { name: "dog", class: "mammal" },
  { name: "cat", class: "mammal" },
  { name: "duck", class: "bird" },
];

const includesMammal = animals.some((animal) => animal.class === "mammal");
console.log(includesMammal); // true

const includesFish = animals.some((animal) => animal.class === "fish");
console.log(includesFish); // false
```

## every

`every`は`some`と違って、全部の要素が条件を満たしていれば`true`、一つでも条件を満たしていなかったら`false`を返すよ。

```javascript
const animals = [
  { name: "dog", class: "mammal", hasLegs: true },
  { name: "cat", class: "mammal", hasLegs: true },
  { name: "duck", class: "bird", hasLegs: true },
];

const allHaveLegs = animals.every((animal) => animal.hasLegs);
console.log(allHaveLegs); // true

const allAreMammal = animals.every((animal) => animal.class === "mammal");
console.log(allAreMammal); // false
```

## sort

`sort`は要素を順番通りに並び替えるよ。

⚠️ 他の関数と違って、元の配列の順番を変えちゃうから注意してね！

```javascript
const items = [4, 2, 3, 1];
const sortedItems = items.sort();
console.log(sortedItems); // [1,2,3,4]
// 元の配列の順番も変わっちゃった！
console.log(items); // [1,2,3,4]
```

元の配列の順番を変えたくないときは、配列を複製する必要があるよ。

```javascript
const items = [4, 2, 3, 1];
const sortedItems = [...items].sort();
console.log(sortedItems); // [1,2,3,4]
// sortする前に配列を複製したから、順番が変わらなかったね！
console.log(items); // [4,2,3,1]
```

どういう順番で並べるかを指定したい場合は、関数を渡すことができるよ。

```javascript
const items = [4, 2, 3, 1];
const sortedItems = [...items].sort((first, second) => {
  // この関数が負の数を返したら、firstの方がsecondよりも先にくる。
  // この関数が正の数を返したら、secondの方がfirstよりも先にくる。

  // この場合はsecond - firstだから、secondの方がfirstよりも大きかったら
  // この関数は正の数を返すね。つまり大きい方が先にくるようになる。
  return second - first;
});
console.log(sortedItems); // [4,3,2,1]
console.log(items); // [4,2,3,1]
```

## reduce

`reduce`はとても強力な関数で、上の全ての関数の親とも言われているよ 😲
というのも、上の関数は全て`reduce`で書き換えることもできるんだ 🤯

`reduce`の説明をするまえに、リデューサーと呼ばれる関数の説明をするね。

リデューサーは、一つの値（アキュムレーター）ともう一つの値を受け取って、新しいアキュムレーターの値を返す関数のことを言うよ。

「アキュムレーターとは何ぞや！？」ってなっても心配しないで！今までの値と何も変わらない、ただの値だよ。
便利だから名前をつけてるだけ 😊

例えば下の例では、`sumReducer`というリデューサーが`sum`というアキュムレーターと`value`という値を受け取って、新しい`sum`の値を返しているね。

```javascript
const sumReducer = (sum, value) => {
  return sum + value;
};

// 最初のアキュムレーターは0、値は1。
let sum = sumReducer(0, 1);
console.log(sum); // 1

// 上で返されたsumは、次のアキュムレーターになるよ。
// 次は2を渡しているね。
sum = sumReducer(sum, 2);
console.log(sum); // 3

// もう一度！次は3だ。
sum = sumReducer(sum, 3);
console.log(sum); // 6
```

`reduce`は配列の要素を使って、上と同じことをするよ。ちょっと分かりにくいかな？上の例を`reduce`を使って書き換えてみよう！

```javascript
const sumReducer = (sum, value) => {
  return sum + value;
};

const values = [1, 2, 3];
const sum = values.reduce(sumReducer, 0);
console.log(sum); // 6
```

次は`reduce`を使って`filter`を書き換えてみようか 😄

```javascript
const animals = [
  { name: "dog", class: "mammal" },
  { name: "cat", class: "mammal" },
  { name: "duck", class: "bird" },
];

// filterを使うとこうなる
const mammals = animals.filter((animal) => animal.class === "mammal");
console.log(mammals); // [{"name":"dog","class":"mammal"},{"name":"cat","class":"mammal"}]

// reduceを使うとこうなる
const mammals2 = animals.reduce((filtered, animal) => {
  if (animal.class === "mammal") {
    return [...filtered, animal];
  } else {
    return filtered;
  }
}, []);

// 同じ結果になったね！
console.log(mammals2); // [{"name":"dog","class":"mammal"},{"name":"cat","class":"mammal"}]
```

もちろん、`map`だって`reduce`で書けちゃうよ 🙂

```javascript
const animals = [
  { name: "dog", class: "mammal" },
  { name: "cat", class: "mammal" },
  { name: "duck", class: "bird" },
];

// mapを使うとこうなる
const animalNames = animals.map((animal) => animal.name);
console.log(animalNames); // ["dog","cat","duck"]

// reduceを使うとこうなる
const animalNames2 = animals.reduce((animalNames, animal) => {
  return [...animalNames, animal.name];
}, []);

// ほら、同じ結果！
console.log(animalNames2); // ["dog","cat","duck"]
```

`reduce`はとても強力だから、色々なことができちゃうんだ。
もちろん`filter`や`map`で出来ることはそれでやった方がいいけどね 😊
