import * as React from "react";
import { InstructionID } from "../../../common";
import { instructionHTMLSelector } from "../../presentation";
import { ViewInstruction } from "../components/view-instruction";

interface Props {
  id: InstructionID;
}

export const ConnectedViewInstruction: React.FunctionComponent<Props> = (
  props: Props
) => {
  return (
    <ViewInstruction
      id={props.id}
      fetchHTML={(id: InstructionID): PromiseLike<string> =>
        instructionHTMLSelector(id)
      }
    />
  );
};
