import * as React from "react";
import { ElementID } from "../../../../common";

interface Props {
  css: string;
  onChange: (css: string) => void;
}

export const CSSFiddleEditor: React.FunctionComponent<Props> = (
  props: Props
) => {
  return (
    <textarea
      id={ElementID.CSSFiddleCode}
      className="fiddle-code"
      value={props.css}
      autoCorrect="off"
      autoCapitalize="none"
      placeholder="ここに CSS を書いてね ✍️"
      onChange={(event) => {
        props.onChange(
          event.target.value.replace(/[‘’]/g, "'").replace(/[“”]/g, '"')
        );
      }}
    />
  );
};
