import * as React from "react";
import { ElementID } from "../../../../common";
import { JavaScriptFiddleEditor } from "./javascript-fiddle-editor";
import { useCompiledHTML } from "../create-html";
import { HTMLFiddleOutput } from "../html-fiddle/html-fiddle-output";

export const JavaScriptFiddle: React.FunctionComponent = () => {
  const [code, setCode] = React.useState<string>("");
  const [compiledHTML, consoleLogs, compileHTML] = useCompiledHTML();

  return (
    <div className="single-fiddle-container">
      <JavaScriptFiddleEditor code={code} onChange={setCode} />
      <button
        id={ElementID.JavaScriptFiddleExecute}
        className="fiddle-execute"
        type="button"
        onClick={() => {
          compileHTML({ javaScript: code });
        }}
      >
        実行 ▶️
      </button>
      <HTMLFiddleOutput html={compiledHTML} logs={consoleLogs} logOnly />
    </div>
  );
};
