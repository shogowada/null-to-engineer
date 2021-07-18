import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { InstructionID, InstructionMetadata } from "../../../common";
import { AppDispatch, AppState } from "../../presentation";
import { ViewChapters } from "../components/view-chapters";

interface Props {
  selectedInstructionID: InstructionID;
}

export const ConnectedViewChapters: React.FunctionComponent<Props> = (
  props: Props
) => {
  const dispatch: AppDispatch = useDispatch();
  const instructionMetadataList: InstructionMetadata[] = useSelector(
    (state: AppState) => state.instructionMetadataList
  );

  return (
    <ViewChapters
      selectedInstructionID={props.selectedInstructionID}
      instructionMetadataList={instructionMetadataList}
      onClick={(href: string) => {
        dispatch(push(href));
      }}
    />
  );
};
