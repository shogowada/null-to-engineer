import * as React from "react";
import * as ReactDOM from "react-dom";
import { InstructionID } from "../common";
import { appAPIClient } from "./infrastructure";
import { ConnectedViewInstruction } from "./gui/containers/connected-view-instruction";
import { Fiddle } from "./gui/components/fiddle";

const mountDOM = document.createElement("div");
document.body.appendChild(mountDOM);

appAPIClient.getVersion().then((version) =>
  ReactDOM.render(
    <div>
      <ConnectedViewInstruction id={InstructionID.JavaScriptBasics} />
      <Fiddle />
    </div>,
    mountDOM
  )
);
