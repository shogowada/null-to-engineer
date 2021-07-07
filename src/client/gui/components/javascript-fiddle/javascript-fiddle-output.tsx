import * as React from "react";
import { ElementID } from "../../../../common";
import { createClassName } from "../create-class-name";

interface Props {
  logs: string[];
}

export const JavaScriptFiddleOutput: React.FunctionComponent<Props> = (
  props: Props
) => {
  return (
    <pre
      id={ElementID.JavaScriptFiddleOutput}
      className={createClassName([props.logs.length ? "" : "empty"])}
      style={{ flex: 1 }}
    >
      {props.logs.length
        ? props.logs.join("\n")
        : "コードを実行すると、結果がここに表示されるよ👀"}
    </pre>
  );
};
