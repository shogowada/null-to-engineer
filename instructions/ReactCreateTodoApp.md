# タスク管理アプリを作る

## 仕様

以下が今回作るタスク管理アプリの仕様になるよ。

- タスクの一覧を表示する
- 終わったタスクは印をつけられる
- タスクを追加できる

これができるウェブアプリを React を使って開発しよう！

## タスク一覧の表示

`React.useState`で`tasks`というステートを作って、それを使ってタスクのステートを管理しよう。
「ステート管理」というと難しく聞こえちゃうけど、要はタスクの一覧を機械に覚えておいてもらうってことだよ。
`React.useState`には最初のステートを渡すことができるから、いくつか最初のタスクを渡そうか。

```javascript
const Main = () => {
  const [tasks, setTasks] = React.useState([
    { id: 0, name: "シャワーを浴びる" },
    { id: 1, name: "歯を磨く" },
  ]);

  return (
    <div>
      <h1>タスク管理アプリ</h1>
      <ul>
        {tasks.map((task) => {
          return <li key={task.id}>{task.name}</li>;
        })}
      </ul>
    </div>
  );
};

ReactDOM.render(<Main />, document.getElementById("root"));
```

React では JSX が入った配列を描画することができるんだけど、そのときはそれぞれの要素に`key`属性を持たせる必要があるんだ。
`key`属性の値はユニークである、つまり重複しない必要があるよ。
ここでは`tasks`を`map`して、それぞれのタスクを`li`要素の JSX に変換しているね。
だからそれぞれの`li`要素にユニークな`key`を与える必要があるよ。
ここではタスクの`id`を使おう。

## 終わったタスクに印をつける

タスクをクリックすることで

```javascript
const Main = () => {
  const [tasks, setTasks] = React.useState([
    { id: 0, name: "シャワーを浴びる" },
    { id: 1, name: "歯を磨く" },
  ]);

  return (
    <div>
      <h1>タスク管理アプリ</h1>
      <ul>
        {tasks.map((task) => {
          return <li key={task.id}>{task.name}</li>;
        })}
      </ul>
    </div>
  );
};

ReactDOM.render(<Main />, document.getElementById("root"));
```

```javascript
const Main = () => {
  const [tasks, setTasks] = React.useState([]);

  return (
    <div>
      <NewTask
        onCreate={(task) => setTasks((prevTasks) => [task, ...prevTasks])}
      />
      <TaskList
        tasks={tasks}
        onDoneClick={(id, done) => {
          setTasks((prevTasks) =>
            prevTasks.map((prevTask) => {
              if (prevTask.id === id) {
                return {
                  ...prevTask,
                  done,
                };
              } else {
                return prevTask;
              }
            })
          );
        }}
      />
    </div>
  );
};

const NewTask = (props) => {
  const [nextID, setNextID] = React.useState(0);
  const [name, setName] = React.useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        props.onCreate({ id: nextID, name, done: false });
        setNextID((prevNextID) => prevNextID + 1);
        setName("");
      }}
    >
      <label>
        名前:
        <input
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </label>
      <button type="submit" disabled={!name.length}>
        追加
      </button>
    </form>
  );
};

const TaskList = (props) => {
  return (
    <ul>
      {props.tasks.map((task) => (
        <li key={task.id}>
          <Task task={task} onDoneClick={props.onDoneClick} />
        </li>
      ))}
    </ul>
  );
};

const Task = (props) => {
  return (
    <label>
      <input
        type="checkbox"
        checked={props.task.done}
        onChange={(event) => {
          props.onDoneClick(props.task.id, event.target.checked);
        }}
      />
      {props.task.name}
    </label>
  );
};

ReactDOM.render(<Main />, document.getElementById("root"));
```
