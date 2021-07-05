import * as React from "react";
import { Link } from "react-router-dom";
import {
  Chapters,
  ElementID,
  InstructionID,
  InstructionMetadata,
  InstructionMetadataList,
  RoutePath,
} from "../../../common";

interface Props {
  id: InstructionID;
  fetchHTML: (id: InstructionID) => PromiseLike<string>;
}

export const ViewInstruction = (props: Props) => {
  const [html, setHTML] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    setHTML("");
    props
      .fetchHTML(props.id)
      .then(setHTML, () =>
        setErrorMessage(
          "ページの読み込みに失敗しました😝あとでもう一度試してください"
        )
      );
  }, [props.id]);

  const nextID: InstructionID | null = React.useMemo(
    () => getNextInstructionIDOrNull(props.id),
    [props.id]
  );

  const renderNextInstructionLink = (nextID: InstructionID) => {
    const metadata: InstructionMetadata = InstructionMetadataList.find(
      (metadata) => metadata.id === nextID
    )!;
    return (
      <div>
        <Link
          id={ElementID.NextInstruction}
          to={RoutePath.instruction(nextID)}
          style={{ float: "right" }}
        >
          次は {metadata.name} 👉
        </Link>
      </div>
    );
  };

  return (
    <div className="instruction-pane">
      {errorMessage && <div>{errorMessage}</div>}
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {nextID && renderNextInstructionLink(nextID)}
    </div>
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
