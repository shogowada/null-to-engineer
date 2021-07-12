import * as React from "react";
import { HTMLFiddleEditor } from "../html-fiddle/html-fiddle-editor";
import { CSSFiddleEditor } from "../css-fiddle/css-fiddle-editor";
import { JavaScriptFiddleEditor } from "../javascript-fiddle/javascript-fiddle-editor";
import { ElementID } from "../../../../common";
import { HTMLFiddleOutput } from "../html-fiddle/html-fiddle-output";

export const JavaScriptHTMLCSSFiddle: React.FunctionComponent = () => {
  const [html, setHTML] = React.useState<string>("");
  const [css, setCSS] = React.useState<string>("");
  const [javaScript, setJavaScript] = React.useState<string>("");

  const [compiledHTML, setCompiledHTML] = React.useState<string>("");

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
          const linkElement: string = `<link rel="stylesheet" type="text/css" href="data:text/css;base64,${btoa(
            css
          )}">`;
          const scriptElement: string = `<script defer type="text/javascript" src="data:text/javascript;base64,${btoa(
            javaScript
          )}"></script>`;

          setCompiledHTML(`${linkElement}
${scriptElement}
${html}`);
        }}
      >
        実行 ▶️
      </button>
      <HTMLFiddleOutput html={compiledHTML} />
    </div>
  );
};
