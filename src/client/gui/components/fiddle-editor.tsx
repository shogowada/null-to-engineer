import * as React from "react";

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
      spellCheck={false}
      placeholder={`ここに ${props.name} を書いてね ✍️`}
      onChange={(event) => {
        props.onChange(event.target.value);
      }}
    />
  );
};
