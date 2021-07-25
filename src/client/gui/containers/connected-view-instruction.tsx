import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Chapters,
  InstructionContent,
  InstructionID,
  InstructionMetadata,
} from "../../../common";
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
  const loadedHTML: string | null = useSelector((state: AppState) => {
    const instructionContent: InstructionContent | undefined =
      state.instructionContents.find((content) => content.id === props.id);
    return instructionContent?.html || null;
  });

  const nextInstructionMetadata: InstructionMetadata | null = useSelector(
    (state: AppState) => {
      const nextID: InstructionID | null = getNextInstructionIDOrNull(props.id);
      return (
        state.instructionMetadataList.find(
          (metadata) => metadata.id === nextID
        ) || null
      );
    }
  );

  return (
    <ViewInstruction
      id={props.id}
      nextInstructionMetadata={nextInstructionMetadata}
      html={loadedHTML}
      isLoading={!loadedHTML}
      fetchHTML={(id: InstructionID): PromiseLike<unknown> => {
        return dispatch(fetchInstructionContent(id));
      }}
    />
  );
};

const getNextInstructionIDOrNull = (
  instructionID: InstructionID
): InstructionID | null => {
  const instructionIDs: InstructionID[] = Chapters.flatMap(
    (chapter) => chapter.instructionIDs
  );
  const index: number = instructionIDs.findIndex(
    (thisInstructionID) => thisInstructionID === instructionID
  );
  const nextIndex: number = index + 1;
  if (nextIndex < instructionIDs.length) {
    return instructionIDs[nextIndex];
  } else {
    return null;
  }
};
