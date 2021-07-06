import * as React from "react";
import { InstructionID, InstructionIDs } from "../../../common";
import { ConnectedViewInstruction } from "../containers/connected-view-instruction";
import { JavaScriptFiddle } from "./javascript-fiddle";
import { ConnectedViewChapters } from "../containers/connected-view-chapters";
import { ToggleFiddle } from "./toggle-fiddle";
import { createClassName } from "./create-class-name";

interface Props {
  match: {
    params: { id?: string };
  };
}

export const Home: React.FunctionComponent<Props> = (props: Props) => {
  const instructionID: InstructionID = React.useMemo(
    () =>
      InstructionIDs.find((id) => id === props.match.params.id) ||
      InstructionID.JavaScriptBasics,
    [props.match.params.id]
  );

  const [isFiddleVisible, setIsFiddleVisible] = React.useState<boolean>(false);

  return (
    <div className="main-container">
      <div className="item-chapters">
        <ConnectedViewChapters selectedInstructionID={instructionID} />
      </div>
      <div
        className={createClassName([
          "item-instruction",
          isFiddleVisible ? "hidden" : "visible",
        ])}
      >
        <ConnectedViewInstruction id={instructionID} />
      </div>
      <div
        className={createClassName([
          "item-fiddle",
          isFiddleVisible ? "visible" : "hidden",
        ])}
      >
        <JavaScriptFiddle />
      </div>
      <div className="copyright">
        ©{" "}
        <a href="https://twitter.com/wada_shogo" target="_blank">
          Shogo Wada
        </a>
        . All rights reserved.
      </div>
      <ToggleFiddle
        visible={isFiddleVisible}
        onClick={() => setIsFiddleVisible((prevState) => !prevState)}
      />
    </div>
  );
};
