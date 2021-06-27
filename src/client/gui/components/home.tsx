import * as React from "react";
import { Chapters, InstructionID } from "../../../common";
import { ConnectedViewInstruction } from "../containers/connected-view-instruction";
import { Fiddle } from "./fiddle";
import { ConnectedViewChapters } from "../containers/connected-view-chapters";

interface Props {
  match: {
    params: { id?: string };
  };
}

export const Home: React.FunctionComponent<Props> = (props: Props) => {
  const instructionID: InstructionID = React.useMemo(
    () =>
      Chapters.flatMap((chapter) => chapter.instructionIDs).find(
        (id) => id === props.match.params.id
      ) || InstructionID.JavaScriptBasics,
    [props.match.params.id]
  );

  return (
    <div>
      <ConnectedViewChapters selectedInstructionID={instructionID} />
      <ConnectedViewInstruction id={instructionID} />
      <Fiddle />
    </div>
  );
};
