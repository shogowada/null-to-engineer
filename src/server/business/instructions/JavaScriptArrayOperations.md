# JavaScript の配列

配列は日々のプログラミングでも沢山使うよ！配列から他の配列を作ったり、一つの値を取り出したり。そのために覚えておいたら便利な方法が色々あるから、見ていこうね ☺️

## filter

`filter`を使うと、元の配列からある条件を満たす要素だけを取り出した、新しい配列を作ることができるんだ。

```javascript
const people = [
  { name: "Mercury Veca", age: 20 },
  { name: "Karpos Boris", age: 15 },
];

const people18OrOlder = people.filter((person) => person.age >= 18);
console.log(people18OrOlder); // [{"name":"Mercury Veca","age":20}]

// 新しい配列を作るから、元の配列はそのままだよ！
console.log(people); // [{"name":"Mercury Veca","age":20},{"name":"Karpos Boris","age":15}]
```

## map

`map`を使うと、配列の各要素から新しい値を取り出した配列を作ることができる。

```javascript
const people = [
  { name: "Mercury Veca", age: 20 },
  { name: "Karpos Boris", age: 15 },
];

const names = people.map((person) => person.name);
console.log(names); // ["Mercury Veca","Karpos Boris"]

// 新しい配列を作るから、元の配列はそのままだよ！
console.log(people); // [{"name":"Mercury Veca","age":20},{"name":"Karpos Boris","age":15}]
```

## flat

`flat`を使うと、配列の要素が配列だったときに、その配列の要素も全て繋げた一つの配列を作ることができるよ。

```javascript
const array = [1, [2, 3], [4, 5], 6];

const flattenedArray = array.flat();
console.log(flattenedArray); // [1,2,3,4,5,6]

// 新しい配列を作るから、元の配列はそのままだよ！
console.log(array); // [1,[2,3],[4,5],6]
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

## find

`find`は`filter`に近いんだけど、条件を満たした要素全てを返すんじゃなくて、条件を満たした要素一つだけを返すよ。見つからなかった場合は`undefined`という特別な値を返す。

```javascript

```

## includes

```javascript
const animals = ["dog", "cat", "fish"];

const includesDog = animals.includes("dog");
console.log(includesDog); // true

const includesHamster = animals.includes("hamster");
console.log(includesHamster); // false
```

## some

## every

## sort

## reduce
