import * as React from "react";
import { ElementID } from "../../../../common";
import { HTMLFiddleEditor } from "./html-fiddle-editor";
import { HTMLFiddleOutput } from "./html-fiddle-output";
import { useCompiledHTML } from "../create-html";

interface Props {
  html: string;
  setHTML: (html: string) => void;
}

export const HTMLFiddle: React.FunctionComponent<Props> = (props: Props) => {
  const [compiledHTML, consoleLogs, compileHTML] = useCompiledHTML();

  return (
    <div className="single-fiddle-container">
      <HTMLFiddleEditor html={props.html} onChange={props.setHTML} />
      <button
        id={ElementID.HTMLFiddleExecute}
        className="fiddle-execute"
        type="button"
        onClick={() => {
          compileHTML({ html: props.html });
        }}
      >
        実行 ▶️
      </button>
      <HTMLFiddleOutput html={compiledHTML} logs={consoleLogs} />
    </div>
  );
};
