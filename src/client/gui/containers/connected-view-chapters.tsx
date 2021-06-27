import * as React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { InstructionID, RoutePath } from "../../../common";
import { AppDispatch } from "../../presentation";
import { ViewChapters } from "../components/view-chapters";

interface Props {
  selectedInstructionID: InstructionID;
}

export const ConnectedViewChapters: React.FunctionComponent<Props> = (
  props: Props
) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <ViewChapters
      selectedInstructionID={props.selectedInstructionID}
      onClick={(instructionID: InstructionID) => {
        dispatch(push(RoutePath.instruction(instructionID)));
      }}
    />
  );
};
