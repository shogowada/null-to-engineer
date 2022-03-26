# タスク管理アプリを作る

## 仕様

以下が今回作るタスク管理アプリの仕様になるよ 👀

- タスクの一覧を表示する
- 終わったタスクは印をつけられる
- タスクを追加できる

これができるウェブアプリを React を使って開発しよう 🙌

## タスク一覧の表示

`React.useState`で`tasks`というステートを作って、それを使ってタスクのステートを管理しよう。
「ステート管理」というと難しく聞こえちゃうけど、要はタスクの一覧を機械に覚えておいてもらうってことだよ ✍️
`React.useState`には最初のステートを渡すことができるから、いくつか最初のタスクを渡そうか 😊

`index.js` に以下のコードを書こう！

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

const root = document.getElementById("root");
ReactDOM.render(<Main />, root);
```

途中、`ul`要素を使ってタスク一覧を表示しているね。
一覧は`tasks`を`map`で`li`要素に変換することで表示しているよ 😄

React ではこうやって JSX が入った配列を描画することができるんだけど、そのときはそれぞれの要素に`key`属性を持たせる必要があるんだ 😲
`key`属性の値はユニークである、つまり重複しない必要があるよ。

React は JSX を描画するときに、今描画されている JSX と次に描画する JSX を比べて、変更があったところだけを実際に描画するんだ。
だから React はもし JSX が配列に入っている場合は、`key`属性の値を比べてどの要素とどの要素が同じなのか分かるようにするって決めてるんだ 🙂

ここではタスクの`id`を`key`として使おう。

## 終わったタスクに印をつける

タスクをクリックすることで、タスクが終わった印を付けれるようにしよう。印にはチェックボックスを使おうね ✅

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
          // label と input が追加されたね！
          return (
            <li key={task.id}>
              <label>
                <input
                  type="checkbox"
                  checked={task.done}
                  onClick={() => {
                    setTasks((prevTasks) => {
                      return prevTasks.map((prevTask) => {
                        if (prevTask.id === task.id) {
                          return { ...prevTask, done: !prevTask.done };
                        } else {
                          return prevTask;
                        }
                      });
                    });
                  }}
                />
                {task.name}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
```

この`input`要素には`type="checkbox"`という属性がついているから、チェックボックスになるよ。
そしてこの`input`要素と`{task.name}`は、`label`要素に囲まれてるね。こうすることによって、チェックボックスの名前を表示することができるんだ 👍

チェックボックスは、`checked`属性でチェックされているかどうかを設定できるんだ。ここでは`task.done`を渡しているね。
つまり`task.done`が`true`ならチェックされた状態 ✅ そうでないならチェックされていない状態になるよ ☑️

チェックボックスの`onClick`には関数を渡していて、その中で何やらごちゃごちゃしているね。
`onClick`に関数を渡すと、その要素がクリックされたときに渡した関数を呼び出してもらえるんだ。
ここではチェックボックスをクリックする度にタスク完了の印を変更したいから、その処理をしているんだね。ちょっと詳しく見てみようか 👀

```javascript
setTasks((prevTasks) => {
  return prevTasks.map((prevTask) => {
    if (prevTask.id === task.id) {
      return { ...prevTask, done: !prevTask.done };
    } else {
      return prevTask;
    }
  });
});
```

`prevTasks`を`map`して、もし`prevTask`が現在の`task`と同じタスクなら`done`プロパティを裏返し、そうでないならそのまま`prevTask`を返しているね。
こうすることで、今クリックされたタスクの`done`プロパティだけを裏返すことができるんだ 💡

タスクをクリックして、チェックボックスが裏返しになったら成功だよ 🎉

## コードを綺麗にする

このままだとコードがごちゃごちゃしてて読みにくいから、`onClick`に渡した関数に名前をつけて、少し綺麗にしよう ✨

```javascript
const Main = () => {
  const [tasks, setTasks] = React.useState([
    { id: 0, name: "シャワーを浴びる" },
    { id: 1, name: "歯を磨く" },
  ]);

  const onTaskClick = (taskID) => {
    setTasks((prevTasks) => {
      return prevTasks.map((prevTask) => {
        if (prevTask.id === taskID) {
          return { ...prevTask, done: !prevTask.done };
        } else {
          return prevTask;
        }
      });
    });
  };

  return (
    <div>
      <h1>タスク管理アプリ</h1>
      <ul>
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <label>
                <input
                  type="checkbox"
                  checked={task.done}
                  // ここで onTaskClick 使ってるよ！
                  onClick={() => {
                    onTaskClick(task.id);
                  }}
                />
                {task.name}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
```

こうやってコードを綺麗にしていく作業のことを「リファクタリング」と呼ぶよ 😄

今のままでもいいんだけど、新しく React のコンポーネントを作って、もう１ステップ綺麗にしてみよう 😁

```javascript
const Main = () => {
  // 他のコード...
  return (
    <div>
      <h1>タスク管理アプリ</h1>
      <ul>
        {tasks.map((task) => {
          // Task コンポーネントを使おう
          return (
            <li key={task.id}>
              <Task
                task={task}
                onClick={(taskId) => {
                  onTaskClick(taskId);
                }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// 新しく Task コンポーネントを作ろう
// タスクは props から渡すよ
const Task = (props) => {
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

あれ、もう１ステップ綺麗にできそうだぞ？タスク一覧も一つのコンポーネントにしてみたらどうだろう 🤔

```javascript
const Main = () => {
  // 他のコード...
  return (
    <div>
      <h1>タスク管理アプリ</h1>
      <TaskList
        tasks={tasks}
        onTaskClick={(taskId) => {
          onTaskClick(taskId);
        }}
      />
    </div>
  );
};

const TaskList = (props) => {
  return (
    <ul>
      {props.tasks.map((task) => {
        return (
          <li key={task.id}>
            <Task
              task={task}
              onClick={(taskId) => {
                props.onTaskClick(taskId);
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};

const Task = (props) => {
  return (
    <label>
      <input
        type="checkbox"
        checked={props.task.done}
        onClick={() => {
          props.onClick(props.task.id);
        }}
      />
      {props.task.name}
    </label>
  );
};
```

だいぶ読みやすくなったかな？他にも気づいたところがあったらリファクタリングしてね 🙌

## 新しいタスクを追加する

新しいタスクを追加する機能を実装しよう！

自分で新しくタスクを追加できるってことは、もう最初からタスクを用意しておく必要はなくなるから、まずはタスク一覧を空っぽにしようか 😊
あ、あと次のタスクの`id`を保存しておくステートも作ろうね 😄

```javascript
const Main = () => {
  const [tasks, setTasks] = React.useState([]);
  const [nextTaskId, setNextTaskId] = React.useState(0);
  // 他のコード...
};
```

タスクを追加するにはユーザーにタスクの名前を入力してもらわなきゃならないね。
ユーザーに何か情報を入力してもらうときは`form`要素を使おう 🙌

```javascript
// 新しくコンポーネントを作ろう！
const NewTask = (props) => {
  // 現在入力されている task の名前も、ステートとして管理しよう。
  const [name, setName] = React.useState("");

  return (
    <form
      // form には submit というイベントがあって、
      // これはフォーム内でエンターキーを入力したときや、送信ボタンを押したときに呼ばれるイベントなんだ。
      // submit イベントは、onSubmit 属性に関数を渡すことで処理できるよ。
      onSubmit={(event) => {
        // submit イベントは、放っておくと勝手にデータをサーバーに送信しようとしちゃうんだ。
        // 今回は自分でイベントを処理したいから、preventDefault を呼ぶことでデフォルトの動きを止めよう。
        event.preventDefault();

        props.onCreate({ name, done: false });

        // そのまま次の task 名を入力できるように、名前を空っぽにしよう
        setName("");
      }}
    >
      <label>
        名前:
        <input
          type="text"
          // input の値を name ステートに設定しよう。
          value={name}
          onChange={(event) => {
            // event.target はこの input 要素そももの。
            // そして input 要素の value には、現在の値が入っているよ。
            // つまり以下のコードは、name ステートを現在の input の値に設定しているんだ。
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
```

これを `Main` コンポーネントに追加しよう。

```javascript
const Main = () => {
  // 他のコード...

  const onCreate = (task) => {
    const id = nextTaskId;

    setNextTaskId((prevNextTaskId) => {
      // 次のタスクの id は、今のタスクの id に１を足したもの
      return prevNextTaskId + 1;
    });

    setTasks((prevTasks) => {
      // 次の tasks ステートは、現在の tasks に新しい task を追加したもの
      // id を渡すのを忘れないようにしよう
      const nextTask = {
        ...task,
        id,
      };
      return [...prevTasks, nextTask];
    });
  };

  return (
    <div>
      <h1>タスク管理アプリ</h1>
      <NewTask
        onCreate={(task) => {
          onCreate(task);
        }}
      />
      <TaskList
        tasks={tasks}
        onTaskClick={(taskId) => {
          onTaskClick(taskId);
        }}
      />
    </div>
  );
};
```

新しいタスクを入力できるようになったかな？
どんなに大きなアプリケーションも、こうやって小さいコンポーネントを組み合わせることで作られてるんだよ 😊
