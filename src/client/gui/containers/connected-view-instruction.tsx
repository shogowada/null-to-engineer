import * as React from "react";
import { useDispatch } from "react-redux";
import { InstructionContent, InstructionID } from "../../../common";
import { AppDispatch, fetchInstructionContent } from "../../presentation";
import { ViewInstruction } from "../components/view-instruction";

interface Props {
  id: InstructionID;
}

export const ConnectedViewInstruction: React.FunctionComponent<Props> = (
  props: Props
) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <ViewInstruction
      id={props.id}
      fetchHTML={async (id: InstructionID): Promise<string> => {
        const content: InstructionContent = await dispatch(
          fetchInstructionContent(id)
        );
        return content.html;
      }}
    />
  );
};
