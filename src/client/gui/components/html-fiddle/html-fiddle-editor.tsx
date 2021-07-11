import * as React from "react";
import { ElementID } from "../../../../common";
import { FiddleEditor } from "../fiddle-editor";

interface Props {
  html: string;
  onChange: (html: string) => void;
}

export const HTMLFiddleEditor: React.FunctionComponent<Props> = (
  props: Props
) => {
  return (
    <FiddleEditor
      id={ElementID.HTMLFiddleCode}
      name="HTML"
      value={props.html}
      onChange={props.onChange}
    />
  );
};
