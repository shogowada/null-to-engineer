import * as React from "react";
import { ElementID } from "../../../../common";
import { HTMLFiddleEditor } from "../html-fiddle/html-fiddle-editor";
import { CSSFiddleEditor } from "../css-fiddle/css-fiddle-editor";
import { HTMLFiddleOutput } from "../html-fiddle/html-fiddle-output";

export const HTMLWithCSSFiddle: React.FunctionComponent = () => {
  const [html, setHTML] = React.useState<string>("");
  const [css, setCSS] = React.useState<string>("");

  const [compiledHTML, setCompiledHTML] = React.useState<string>("");

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
          const linkElement: string = `<link rel="stylesheet" type="text/css" href="data:text/css;base64,${btoa(
            css
          )}">`;

          setCompiledHTML(`${linkElement}
${html}`);
        }}
      >
        実行 ▶️
      </button>
      <HTMLFiddleOutput html={compiledHTML} />
    </div>
  );
};
