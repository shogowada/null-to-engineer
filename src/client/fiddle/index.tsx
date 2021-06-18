import * as React from "react";
import { FiddleEditor } from "./fiddle-editor";
import { FiddleOutput } from "./fiddle-output";

export const Fiddle: React.FunctionComponent = () => {
  const [code, setCode] = React.useState<string>("");

  return (
    <div>
      <FiddleEditor code={code} onCodeChange={setCode} />
      <FiddleOutput code={code} />
    </div>
  );
};
