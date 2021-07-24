# JavaScript のオブジェクト

## 新しいプロパティを追加

オブジェクトに新しいプロパティを追加したい場合、`{...item, newProperty: value}`という書き方で新しいオブジェクトを作ることができるよ。

```typescript
const item = {
  name: "つばさ",
  age: 31,
};
console.log(item);

// 新しいプロパティを追加
const newItem = {
  ...item,
  country: "日本",
};
console.log(newItem);

// 新しいオブジェクトを作るから、元のオブジェクトはそのままだよ！
console.log(item);
```

もし元のオブジェクトを変えたい場合は、`item.newProperty = value`と書くといいよ。

```typescript
const item = {
  name: "つばさ",
  age: 31,
};
console.log(item);

item.country = "日本";
console.log(item);
```
