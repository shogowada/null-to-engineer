import * as React from "react";
import { ElementID } from "../../../../common";
import { HTMLFiddleEditor } from "../html-fiddle/html-fiddle-editor";
import { CSSFiddleEditor } from "../css-fiddle/css-fiddle-editor";
import { JavaScriptFiddleEditor } from "../javascript-fiddle/javascript-fiddle-editor";
import { HTMLFiddleOutput } from "../html-fiddle/html-fiddle-output";
import { useCompiledHTML } from "../create-html";

export const JavaScriptHTMLCSSFiddle: React.FunctionComponent = () => {
  const [html, setHTML] = React.useState<string>("");
  const [css, setCSS] = React.useState<string>("");
  const [javaScript, setJavaScript] = React.useState<string>("");

  const [compiledHTML, compileHTML] = useCompiledHTML();

  return (
    <div className="three-fiddle-container">
      <div className="fiddle-code-container">
        <HTMLFiddleEditor html={html} onChange={setHTML} />
        <CSSFiddleEditor css={css} onChange={setCSS} />
        <JavaScriptFiddleEditor code={javaScript} onChange={setJavaScript} />
      </div>
      <button
        type="button"
        id={ElementID.HTMLFiddleExecute}
        className="fiddle-execute"
        onClick={() => {
          compileHTML({ html, css, javaScript });
        }}
      >
        実行 ▶️
      </button>
      <HTMLFiddleOutput html={compiledHTML} />
    </div>
  );
};
