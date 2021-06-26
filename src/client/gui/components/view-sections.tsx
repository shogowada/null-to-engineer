import * as React from "react";
import { InstructionID } from "../../../common";

interface Props {
  instructionIDs: InstructionID[];
}

export const ViewSections: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <React.Fragment>
      {props.instructionIDs.map((instructionID) => (
        <li key={instructionID}>{instructionID}</li>
      ))}
    </React.Fragment>
  );
};
