import * as React from "react";
import { JavaScriptFiddleEditor } from "./javascript-fiddle-editor";
import { JavaScriptFiddleOutput } from "./javascript-fiddle-output";

export const JavaScriptFiddle: React.FunctionComponent = () => {
  const [code, setCode] = React.useState<string>("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <JavaScriptFiddleEditor code={code} onCodeChange={setCode} />
      <JavaScriptFiddleOutput code={code} />
    </div>
  );
};
