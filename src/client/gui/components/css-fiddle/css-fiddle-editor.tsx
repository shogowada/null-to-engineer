import * as React from "react";
import { ElementID } from "../../../../common";
import { FiddleEditor } from "../fiddle-editor";

interface Props {
  css: string;
  onChange: (css: string) => void;
}

export const CSSFiddleEditor: React.FunctionComponent<Props> = (
  props: Props
) => {
  return (
    <FiddleEditor
      id={ElementID.CSSFiddleCode}
      name="CSS"
      value={props.css}
      onChange={props.onChange}
    />
  );
};
