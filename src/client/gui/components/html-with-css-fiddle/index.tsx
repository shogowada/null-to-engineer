import * as React from "react";
import { ElementID } from "../../../../common";
import { HTMLFiddleEditor } from "../html-fiddle/html-fiddle-editor";
import { CSSFiddleEditor } from "../css-fiddle/css-fiddle-editor";
import { HTMLFiddleOutput } from "../html-fiddle/html-fiddle-output";
import { useCompiledHTML } from "../create-html";

export const HTMLWithCSSFiddle: React.FunctionComponent = () => {
  const [html, setHTML] = React.useState<string>("");
  const [css, setCSS] = React.useState<string>("");

  const [compiledHTML, compileHTML] = useCompiledHTML();

  return (
    <div className="two-fiddle-container">
      <div className="fiddle-code-container">
        <HTMLFiddleEditor html={html} onChange={setHTML} />
        <CSSFiddleEditor css={css} onChange={setCSS} />
      </div>
      <button
        type="button"
        id={ElementID.HTMLFiddleExecute}
        className="fiddle-execute"
        onClick={() => {
          compileHTML({ html, css });
        }}
      >
        実行 ▶️
      </button>
      <HTMLFiddleOutput html={compiledHTML} />
    </div>
  );
};
