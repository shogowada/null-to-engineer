import * as React from "react";
import createCachedSelector from "re-reselect";
import { InstructionID } from "../../../common";
import { appAPIClient } from "../../infrastructure";
import { ViewInstruction } from "../components/view-instruction";

interface Props {
  id: InstructionID;
}

const instructionSelector = createCachedSelector(
  (id: InstructionID): PromiseLike<string> =>
    appAPIClient.getInstructionHTML(id),
  (promisedHTML: PromiseLike<string>) => promisedHTML
)((id: InstructionID) => id);

export const ConnectedViewInstruction: React.FunctionComponent<Props> = (
  props: Props
) => {
  return (
    <ViewInstruction
      id={props.id}
      fetchHTML={(id: InstructionID): PromiseLike<string> => {
        return instructionSelector(id);
      }}
    />
  );
};
