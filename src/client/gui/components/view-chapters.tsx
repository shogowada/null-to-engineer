import * as React from "react";
import { Chapters, InstructionID, InstructionMetadata } from "../../../common";
import { ViewInstructionLinks } from "./view-instruction-links";

interface Props {
  selectedInstructionID: InstructionID;
  instructionMetadataList: InstructionMetadata[];
  onClick: (href: string) => void;
}

export const ViewChapters: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <div className="chapters-pane">
      {Chapters.map((chapter) => (
        <div key={chapter.id}>
          <h3>{chapter.name}</h3>
          <ul className="instruction-list">
            <ViewInstructionLinks
              selectedInstructionID={props.selectedInstructionID}
              instructionIDs={chapter.instructionIDs}
              instructionMetadataList={props.instructionMetadataList}
              onClick={props.onClick}
            />
          </ul>
        </div>
      ))}
    </div>
  );
};
