import * as React from "react";
import { createClassName } from "./create-class-name";

interface Props {
  text: string;
  side: "left" | "right";
  onClick: () => void;
}

export const SideTab: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <div
      className={createClassName(["side-tab", props.side])}
      onClick={() => props.onClick()}
    >
      {props.text}
    </div>
  );
};
