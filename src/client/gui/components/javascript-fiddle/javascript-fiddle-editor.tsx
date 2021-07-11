import * as React from "react";
import { ElementID } from "../../../../common";
import { FiddleEditor } from "../fiddle-editor";

interface Props {
  code: string;
  onChange: (code: string) => void;
}

export const JavaScriptFiddleEditor: React.FunctionComponent<Props> = (
  props: Props
) => {
  return (
    <FiddleEditor
      id={ElementID.JavaScriptFiddleCode}
      name="JavaScript"
      value={props.code}
      onChange={props.onChange}
    />
  );
};
