import * as React from "react";
import * as ReactDOM from "react-dom";
import { InstructionID } from "../common";
import { Fiddle } from "./gui/components/fiddle";
import { ConnectedViewInstruction } from "./gui/containers/connected-view-instruction";

const mountDOM = document.createElement("div");
document.body.appendChild(mountDOM);

ReactDOM.render(
  <div>
    <ConnectedViewInstruction id={InstructionID.JavaScriptBasics} />
    <Fiddle />
  </div>,
  mountDOM
);
