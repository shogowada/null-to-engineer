import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
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
  const [lastLoadedHTML, setLastLoadedHTML] = React.useState<string>("");

  const dispatch: AppDispatch = useDispatch();
  const loadedHTML: string | undefined = useSelector((state: AppState) => {
    const instructionContent: InstructionContent | undefined =
      state.instructionContents.find((content) => content.id === props.id);
    return instructionContent?.html;
  });

  const instructionMetadata: InstructionMetadata = useSelector(
    (state: AppState) =>
      state.instructionMetadataList.find(
        (metadata) => metadata.id === props.id
      )!
  );

  React.useEffect(() => {
    if (loadedHTML) {
      setLastLoadedHTML(loadedHTML);
    }
  }, [loadedHTML]);

  return (
    <ViewInstruction
      id={props.id}
      metadata={instructionMetadata}
      html={loadedHTML || lastLoadedHTML}
      isLoading={!loadedHTML}
      fetchHTML={(id: InstructionID): PromiseLike<unknown> => {
        return dispatch(fetchInstructionContent(id));
      }}
    />
  );
};
