import * as React from "react";
import { InstructionID, InstructionIDs } from "../../../common";
import { ConnectedViewInstruction } from "../containers/connected-view-instruction";
import { Fiddle } from "./fiddle";
import { ConnectedViewChapters } from "../containers/connected-view-chapters";

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

  return (
    <div className="main-container">
      <div className="item-chapters">
        <ConnectedViewChapters selectedInstructionID={instructionID} />
      </div>
      <div className="item-instruction">
        <ConnectedViewInstruction id={instructionID} />
      </div>
      <div className="item-fiddle">
        <Fiddle />
      </div>
    </div>
  );
};
