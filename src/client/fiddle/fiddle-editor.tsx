import * as React from "react";

interface Props {
  code: string;
  onCodeChange: (code: string) => void;
}

export const FiddleEditor: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <div>
      <textarea
        value={props.code}
        onChange={(event) => {
          props.onCodeChange(event.target.value);
        }}
      />
    </div>
  );
};
