import * as React from "react";
import { Chapters, InstructionID } from "../../../common";
import { ViewSections } from "./view-sections";

interface Props {
  selectedInstructionID: InstructionID;
  onClick: (instructionID: InstructionID) => void;
}

export const ViewChapters: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <React.Fragment>
      {Chapters.map((chapter) => (
        <div key={chapter.id}>
          <h3>{chapter.id}</h3>
          <ul>
            <ViewSections
              selectedInstructionID={props.selectedInstructionID}
              instructionIDs={chapter.instructionIDs}
              onClick={props.onClick}
            />
          </ul>
        </div>
      ))}
    </React.Fragment>
  );
};
