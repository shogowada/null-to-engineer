import * as React from "react";
import { InstructionID } from "../../../common";

interface Props {
  selectedInstructionID: InstructionID;
  instructionIDs: InstructionID[];
  onClick: (instructionID: InstructionID) => void;
}

export const ViewSections: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <React.Fragment>
      {props.instructionIDs.map((instructionID) => (
        <li
          key={instructionID}
          style={{
            fontWeight:
              props.selectedInstructionID === instructionID ? "bold" : "normal",
          }}
          onClick={() => props.onClick(instructionID)}
        >
          {instructionID}
        </li>
      ))}
    </React.Fragment>
  );
};
