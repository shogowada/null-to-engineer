# JavaScript のオブジェクト

## プロパティの値を取り出す

オブジェクトからプロパティの値を取り出すには、`.`を使うといいよ 😊

```javascript
const item = {
  name: "つばさ",
  age: 31,
};

console.log(item.name); // つばさ
console.log(item.age); // 31
```

他にもこんな取り出し方もあるんだ！

```javascript
const item = {
  name: "つばさ",
  age: 31,
  country: "日本",
};

const { name, age } = item;
console.log(name); // つばさ
console.log(age); // 31
```

```javascript
const item = {
  name: "つばさ",
  age: 31,
  country: "日本",
};

const { name, ...rest } = item;
console.log(name); // つばさ
console.log(rest); // {"age":31,"country":"日本"}
```

## 新しいプロパティを追加

オブジェクトに新しいプロパティを追加したい場合、`{...item, newProperty: value}`という書き方で新しいオブジェクトを作ることができるよ。

```javascript
const item = {
  name: "つばさ",
  age: 31,
};
console.log(item); // {"name":"つばさ","age":31}

// 新しいプロパティを追加
const newItem = {
  ...item,
  country: "日本",
};
console.log(newItem); // {"name":"つばさ","age":31,"country":"日本"}

// 新しいオブジェクトを作るから、元のオブジェクトはそのままだよ！
console.log(item); // {"name":"つばさ","age":31}
```

もし元のオブジェクトを変えたい場合は、`item.newProperty = value`と書くといいよ。

```javascript
const item = {
  name: "つばさ",
  age: 31,
};
console.log(item); // {"name":"つばさ","age":31}

item.country = "日本";
console.log(item); // {"name":"つばさ","age":31,"country":"日本"}
```
