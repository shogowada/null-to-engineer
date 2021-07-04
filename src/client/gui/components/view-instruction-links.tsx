import * as React from "react";
import {
  InstructionID,
  InstructionMetadata,
  InstructionMetadataList,
  RoutePath,
} from "../../../common";
import { createClassName } from "./create-class-name";

interface Props {
  selectedInstructionID: InstructionID;
  instructionIDs: InstructionID[];
  onClick: (href: string) => void;
}

export const ViewInstructionLinks: React.FunctionComponent<Props> = (
  props: Props
) => {
  return (
    <React.Fragment>
      {props.instructionIDs.map((instructionID) => {
        const instructionMetadata: InstructionMetadata =
          InstructionMetadataList.find(
            (metadata) => metadata.id === instructionID
          )!;
        const href: string = RoutePath.instruction(instructionMetadata.id);
        return (
          <li
            key={instructionMetadata.id}
            className={createClassName([
              "instruction-list-item",
              instructionMetadata.id === props.selectedInstructionID
                ? "selected"
                : null,
            ])}
            onClick={() => props.onClick(href)}
          >
            <a
              className="no-decoration-anchor"
              href={href}
              onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                event.preventDefault();
              }}
            >
              {instructionMetadata.name}
            </a>
          </li>
        );
      })}
    </React.Fragment>
  );
};
