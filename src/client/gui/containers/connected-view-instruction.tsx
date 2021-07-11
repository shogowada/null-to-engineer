import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { InstructionContent, InstructionID } from "../../../common";
import {
  AppDispatch,
  AppState,
  fetchInstructionContent,
} from "../../presentation";
import { ViewInstruction } from "../components/view-instruction";

interface Props {
  id: InstructionID;
}

export const ConnectedViewInstruction: React.FunctionComponent<Props> = (
  props: Props
) => {
  const dispatch: AppDispatch = useDispatch();
  const instructionContent: InstructionContent | undefined = useSelector(
    (state: AppState) =>
      state.instructionContents.find((content) => content.id === props.id)
  );

  return (
    <ViewInstruction
      id={props.id}
      html={instructionContent?.html || ""}
      fetchHTML={(id: InstructionID): PromiseLike<unknown> => {
        return dispatch(fetchInstructionContent(id));
      }}
    />
  );
};
