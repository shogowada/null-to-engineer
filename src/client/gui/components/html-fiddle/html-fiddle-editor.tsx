import * as React from "react";
import { ElementID } from "../../../../common";

interface Props {
  html: string;
  onChange: (html: string) => void;
}

export const HTMLFiddleEditor: React.FunctionComponent<Props> = (
  props: Props
) => {
  return (
    <textarea
      id={ElementID.HTMLFiddleCode}
      value={props.html}
      autoCorrect="off"
      autoCapitalize="none"
      placeholder="ここにHTMLを書いてね✍️"
      onChange={(event) => {
        props.onChange(
          event.target.value.replace(/[‘’]/g, "'").replace(/[“”]/g, '"')
        );
      }}
    />
  );
};
