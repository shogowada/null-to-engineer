import * as React from "react";
import { ElementID } from "../../../../common";

interface Props {
  code: string;
  onCodeChange: (code: string) => void;
}

export const FiddleEditor: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <div>
      <textarea
        id={ElementID.FiddleCode}
        value={props.code}
        onChange={(event) => {
          props.onCodeChange(event.target.value);
        }}
      />
    </div>
  );
};
