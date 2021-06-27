import * as React from "react";
import { InstructionID } from "../../../common";
import { ViewChapters } from "./view-chapters";
import { ConnectedViewInstruction } from "../containers/connected-view-instruction";
import { Fiddle } from "./fiddle";

export const Main: React.FunctionComponent = () => {
  return (
    <div>
      <ViewChapters />
      <ConnectedViewInstruction id={InstructionID.JavaScriptBasics} />
      <Fiddle />
    </div>
  );
};
