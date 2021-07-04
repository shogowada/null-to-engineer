import * as React from "react";
import { ElementID } from "../../../../common";

interface Props {
  code: string;
  onCodeChange: (code: string) => void;
}

export const FiddleEditor: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <textarea
      id={ElementID.FiddleCode}
      value={props.code}
      placeholder="ここにコードを書いてね✍️"
      onChange={(event) => {
        props.onCodeChange(event.target.value);
      }}
    />
  );
};
