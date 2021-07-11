import * as React from "react";
import { ElementID } from "../../../common";

interface Props {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
}

export const FiddleEditor: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <textarea
      id={props.id}
      className="fiddle-code"
      value={props.value}
      autoCorrect="off"
      autoCapitalize="none"
      placeholder={`ここに ${props.name} を書いてね ✍️`}
      onChange={(event) => {
        props.onChange(
          event.target.value.replace(/[‘’]/g, "'").replace(/[“”]/g, '"')
        );
      }}
    />
  );
};
