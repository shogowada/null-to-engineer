import * as React from "react";
import { Link } from "react-router-dom";
import {
  Chapters,
  ElementID,
  InstructionID,
  InstructionMetadata,
  RoutePath,
} from "../../../common";
import { createClassName } from "./create-class-name";

interface Props {
  id: InstructionID;
  metadata: InstructionMetadata;
  isLoading: boolean;
  html: string;
  fetchHTML: (id: InstructionID) => PromiseLike<unknown>;
}

export const ViewInstruction = (props: Props) => {
  React.useEffect(() => {
    props
      .fetchHTML(props.id)
      .then(undefined, (error) =>
        console.error(`${props.id}の読み込みに失敗しました`, error)
      );
  }, [props.id]);

  const nextID: InstructionID | null = React.useMemo(
    () => getNextInstructionIDOrNull(props.id),
    [props.id]
  );

  const renderNextInstructionLink = (nextID: InstructionID) => {
    return (
      <Link
        id={ElementID.NextInstruction}
        to={RoutePath.instruction(nextID)}
        style={{ float: "right" }}
      >
        次は {props.metadata.name} 👉
      </Link>
    );
  };

  return (
    <React.Fragment>
      <div
        className={createClassName([
          "instruction-pane",
          props.isLoading ? "loading" : null,
        ])}
      >
        <div dangerouslySetInnerHTML={{ __html: props.html }} />
      </div>
      {nextID && renderNextInstructionLink(nextID)}
    </React.Fragment>
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
