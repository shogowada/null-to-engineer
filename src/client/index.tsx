import * as React from "react";
import * as ReactDOM from "react-dom";
import { Fiddle } from "./fiddle";

const mountDOM = document.createElement("div");
document.body.appendChild(mountDOM);

ReactDOM.render(<Fiddle />, mountDOM);
