import * as React from "react";
import { ElementID } from "../../../../common";
import { JavaScriptFiddleEditor } from "./javascript-fiddle-editor";
import { useCompiledHTML } from "../create-html";
import { HTMLFiddleOutput } from "../html-fiddle/html-fiddle-output";

interface Props {
  javaScript: string;
  setJavaScript: (javaScript: string) => void;
}

export const JavaScriptFiddle: React.FunctionComponent<Props> = (
  props: Props
) => {
  const [compiledHTML, consoleLogs, compileHTML] = useCompiledHTML();

  return (
    <div className="single-fiddle-container">
      <JavaScriptFiddleEditor
        code={props.javaScript}
        onChange={props.setJavaScript}
      />
      <button
        id={ElementID.JavaScriptFiddleExecute}
        className="fiddle-execute"
        type="button"
        onClick={() => {
          compileHTML({ javaScript: props.javaScript });
        }}
      >
        実行 ▶️
      </button>
      <HTMLFiddleOutput html={compiledHTML} logs={consoleLogs} logOnly />
    </div>
  );
};
