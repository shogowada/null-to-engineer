# ファイルを小さく分ける

バンドルできるようになったから、今まで全部 `index.js` に書いてたコードを、いくつかの小さなファイルに分けて書くことができるようになったよ。

## コンポーネントをファイルに分ける

タスク管理アプリでは、４つのコンポーネントを作ったね

- `Main`
- `NewTask`
- `TaskList`
- `Task`

それぞれのコンポーネントを、それぞれにファイルに分けよう。

まずは `task.js` ファイルを作って、そこに `Task` コンポーネントを入れるよ。

```javascript
// React をインポートするのを忘れずに
import * as React from "react";
// このファイルの外から Task コンポーネントを読み込めるように、
// export をつけるのも忘れないでね！
export const Task = (props) => {
  return (
    <label>
      <input
        type="checkbox"
        checked={props.task.done}
        onClick={() => {
          // props.onClick に task.id を渡そう
          props.onClick(props.task.id);
        }}
      />
      {props.task.name}
    </label>
  );
};
```

他のファイルで `Task` を使うには、一番上に `import { Task } from "./task.js"` と書くといいよ。

これを他のコンポーネントにもやってみて！最終的には以下のようになってるはず。

```javascript
// task.js
import * as React from "react";

export const Task = (props) => {
  // 既存のコード...
};
```

```javascript
// task-list.js
import * as React from "react";
import { Task } from "./task.js";

export const TaskList = (props) => {
  // 既存のコード...
};
```

```javascript
// new-task.js
import * as React from "react";

export const NewTask = (props) => {
  // 既存のコード...
};
```

```javascript
// main.js
import * as React from "react";
import { NewTask } from "./new-task.js";
import { TaskList } from "./task-list.js";

export const Main = () => {
  // 既存のコード...
};
```

```javascript
// index.js
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Main } from "./main.js";

const root = document.getElementById("root");
ReactDOM.render(<Main />, root);
```

`npm run build` を実行して、`node index.js` を実行してみよう。
今までと同じように、タスク管理アプリを起動できたら成功だよ！
