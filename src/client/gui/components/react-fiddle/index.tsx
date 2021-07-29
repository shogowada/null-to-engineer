import * as React from "react";
import { useCompiledHTML } from "../use-compiled-html";
import { JavaScriptFiddleEditor } from "../javascript-fiddle/javascript-fiddle-editor";
import { ElementID } from "../../../../common";
import { HTMLFiddleOutput } from "../html-fiddle/html-fiddle-output";

interface Props {
  javaScript: string;
  setJavaScript: (javaScript: string) => void;
}

const BoilerplateHTML = `<script
  src="https://unpkg.com/react@17/umd/react.development.js"
  crossorigin
></script>
<script
  src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"
  crossorigin
></script>

<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

<div id="root"/ >`;

const BabelScriptType = "text/babel";

export const ReactFiddle: React.FunctionComponent<Props> = (props: Props) => {
  const [compiledHTML, consoleLogs, compileHTML] = useCompiledHTML({
    javaScriptType: BabelScriptType,
  });

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
          compileHTML({ javaScript: props.javaScript, html: BoilerplateHTML });
        }}
      >
        実行 ▶️
      </button>
      <HTMLFiddleOutput html={compiledHTML} logs={consoleLogs} />
    </div>
  );
};
