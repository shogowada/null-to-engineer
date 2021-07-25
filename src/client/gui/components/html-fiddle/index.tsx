import * as React from "react";
import { ElementID } from "../../../../common";
import { HTMLFiddleEditor } from "./html-fiddle-editor";
import { HTMLFiddleOutput } from "./html-fiddle-output";
import { useCompiledHTML } from "../create-html";

export const HTMLFiddle = () => {
  const [html, setHTML] = React.useState<string>("");
  const [compiledHTML, consoleLogs, compileHTML] = useCompiledHTML();

  return (
    <div className="single-fiddle-container">
      <HTMLFiddleEditor html={html} onChange={setHTML} />
      <button
        id={ElementID.HTMLFiddleExecute}
        className="fiddle-execute"
        type="button"
        onClick={() => {
          compileHTML({ html });
        }}
      >
        実行 ▶️
      </button>
      <HTMLFiddleOutput html={compiledHTML} logs={consoleLogs} />
    </div>
  );
};
