import * as React from "react";
import { ElementID } from "../../../../common";
import { HTMLFiddleEditor } from "./html-fiddle-editor";
import { HTMLFiddleOutput } from "./html-fiddle-output";

export const HTMLFiddle = () => {
  const [html, setHTML] = React.useState<string>("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <HTMLFiddleEditor html={html} onChange={setHTML} />
      <button id={ElementID.HTMLFiddleExecute} type="button" onClick={() => {}}>
        実行 ▶️
      </button>
      <HTMLFiddleOutput html={html} />
    </div>
  );
};
