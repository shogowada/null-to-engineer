import * as React from "react";
import { ElementID } from "../../../../common";
import { HTMLFiddleEditor } from "../html-fiddle/html-fiddle-editor";
import { CSSFiddleEditor } from "../css-fiddle/css-fiddle-editor";
import { JavaScriptFiddleEditor } from "../javascript-fiddle/javascript-fiddle-editor";
import { HTMLFiddleOutput } from "../html-fiddle/html-fiddle-output";
import { useCompiledHTML } from "../create-html";

interface Props {
  javaScript: string;
  html: string;
  css: string;
  setJavaScript: (javaScript: string) => void;
  setHTML: (html: string) => void;
  setCSS: (css: string) => void;
}

export const JavaScriptHTMLCSSFiddle: React.FunctionComponent<Props> = (
  props: Props
) => {
  const [compiledHTML, consoleLogs, compileHTML] = useCompiledHTML();

  return (
    <div className="three-fiddle-container">
      <div className="fiddle-code-container">
        <HTMLFiddleEditor html={props.html} onChange={props.setHTML} />
        <CSSFiddleEditor css={props.css} onChange={props.setCSS} />
        <JavaScriptFiddleEditor
          code={props.javaScript}
          onChange={props.setJavaScript}
        />
      </div>
      <button
        type="button"
        id={ElementID.HTMLFiddleExecute}
        className="fiddle-execute"
        onClick={() => {
          compileHTML({
            html: props.html,
            css: props.css,
            javaScript: props.javaScript,
          });
        }}
      >
        実行 ▶️
      </button>
      <HTMLFiddleOutput html={compiledHTML} logs={consoleLogs} />
    </div>
  );
};
