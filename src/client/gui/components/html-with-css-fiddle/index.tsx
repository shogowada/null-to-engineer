import * as React from "react";
import { ElementID } from "../../../../common";
import { HTMLFiddleEditor } from "../html-fiddle/html-fiddle-editor";
import { CSSFiddleEditor } from "../css-fiddle/css-fiddle-editor";
import { HTMLFiddleOutput } from "../html-fiddle/html-fiddle-output";
import { useCompiledHTML } from "../use-compiled-html";

interface Props {
  html: string;
  css: string;
  setHTML: (html: string) => void;
  setCSS: (css: string) => void;
}

export const HTMLWithCSSFiddle: React.FunctionComponent<Props> = (
  props: Props
) => {
  const [compiledHTML, consoleLogs, compileHTML] = useCompiledHTML();

  return (
    <div className="two-fiddle-container">
      <div className="fiddle-code-container">
        <HTMLFiddleEditor html={props.html} onChange={props.setHTML} />
        <CSSFiddleEditor css={props.css} onChange={props.setCSS} />
      </div>
      <button
        type="button"
        id={ElementID.HTMLFiddleExecute}
        className="fiddle-execute"
        onClick={() => {
          compileHTML({ html: props.html, css: props.css });
        }}
      >
        実行 ▶️
      </button>
      <HTMLFiddleOutput html={compiledHTML} logs={consoleLogs} />
    </div>
  );
};
