import * as React from "react";
import * as ReactDOM from "react-dom";
import { InstructionID } from "../common";
import { ConnectedViewInstruction } from "./gui/containers/connected-view-instruction";
import { Fiddle } from "./gui/components/fiddle";
import { ViewChapters } from "./gui/components/view-chapters";

const mountDOM = document.createElement("div");
document.body.appendChild(mountDOM);

ReactDOM.render(
  <div>
    <ViewChapters />
    <ConnectedViewInstruction id={InstructionID.JavaScriptBasics} />
    <Fiddle />
  </div>,
  mountDOM
);
