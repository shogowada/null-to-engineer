import * as React from "react";

interface Props {
  visible: boolean;
  onClick: () => void;
}

export const ToggleFiddle: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <button
      className="toggle-fiddle"
      type="button"
      onClick={() => props.onClick()}
    >
      コードエディタを{props.visible ? "閉じる👇" : "開く👆"}
    </button>
  );
};
