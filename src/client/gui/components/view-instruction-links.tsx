import * as React from "react";
import { Link } from "react-router-dom";
import {
  InstructionID,
  InstructionMetadata,
  InstructionMetadataList,
  RoutePath,
} from "../../../common";
import { createClassName } from "./create-class-name";
import { ViewSectionLinks } from "./view-section-links";

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
        const selected: boolean =
          instructionMetadata.id === props.selectedInstructionID;
        return (
          <li
            key={instructionMetadata.id}
            className={createClassName([
              "instruction-list-item",
              selected ? "selected" : null,
            ])}
            onClick={() => {
              if (!selected) {
                props.onClick(href);
              }
            }}
          >
            {selected ? (
              <React.Fragment>
                {instructionMetadata.name}
                <ViewSectionLinks
                  baseHref={href}
                  sections={instructionMetadata.sections}
                  onClick={(href: string) => {
                    props.onClick(href);
                  }}
                />
              </React.Fragment>
            ) : (
              <Link className="no-decoration-anchor" to={href}>
                {instructionMetadata.name}
              </Link>
            )}
          </li>
        );
      })}
    </React.Fragment>
  );
};
