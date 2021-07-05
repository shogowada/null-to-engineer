import * as React from "react";
import { ElementID } from "../../../../common";

interface Props {
  code: string;
  onCodeChange: (code: string) => void;
}

export const JavaScriptFiddleEditor: React.FunctionComponent<Props> = (
  props: Props
) => {
  return (
    <textarea
      id={ElementID.JavaScriptFiddleCode}
      value={props.code}
      placeholder="ここにコードを書いてね✍️"
      onChange={(event) => {
        props.onCodeChange(event.target.value);
      }}
    />
  );
};
