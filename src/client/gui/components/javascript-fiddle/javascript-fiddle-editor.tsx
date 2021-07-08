import * as React from "react";
import { ElementID } from "../../../../common";

interface Props {
  code: string;
  onChange: (code: string) => void;
}

export const JavaScriptFiddleEditor: React.FunctionComponent<Props> = (
  props: Props
) => {
  return (
    <textarea
      id={ElementID.JavaScriptFiddleCode}
      className="fiddle-code"
      value={props.code}
      autoCorrect="off"
      autoCapitalize="none"
      placeholder="ここにコードを書いてね✍️"
      onChange={(event) => {
        props.onChange(
          event.target.value.replace(/[‘’]/g, "'").replace(/[“”]/g, '"')
        );
      }}
    />
  );
};
