import * as React from "react";
import { ConsoleLog, ElementID } from "../../../../common";
import { createClassName } from "../create-class-name";

interface Props {
  logs: ConsoleLog[];
}

export const ConsoleLogOutput: React.FunctionComponent<Props> = (
  props: Props
) => {
  return (
    <pre
      id={ElementID.JavaScriptFiddleOutput}
      className={createClassName([
        "fiddle-output",
        props.logs.length ? "" : "empty",
      ])}
    >
      {props.logs.length
        ? props.logs.map((log) => (
            <div className="console-log" data-level={log.level}>
              {log.message}
            </div>
          ))
        : "コードを実行すると、結果がここに表示されるよ👀"}
    </pre>
  );
};
