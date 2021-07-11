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
import { Skeleton } from "./skeleton";

interface Props {
  id: InstructionID;
  fetchHTML: (id: InstructionID) => PromiseLike<string>;
}

export const ViewInstruction = (props: Props) => {
  const [html, setHTML] = React.useState<string>("");

  React.useEffect(() => {
    setHTML("");
    props
      .fetchHTML(props.id)
      .then(setHTML, () =>
        setHTML(
          `何かよく分からないエラーが起きちゃった 🤭<br/>後でもう一度試してみて 🙏`
        )
      );
  }, [props.id]);

  const nextID: InstructionID | null = React.useMemo(
    () => getNextInstructionIDOrNull(props.id),
    [props.id]
  );

  const renderContent = () => {
    if (!html) {
      return (
        <React.Fragment>
          <Skeleton height="40px" margin="0 0 15px 0" />
          <Skeleton height="20px" margin="0 0 5px 0" />
          <Skeleton height="20px" margin="0" />
        </React.Fragment>
      );
    } else {
      return <div dangerouslySetInnerHTML={{ __html: html }} />;
    }
  };

  const renderNextInstructionLink = (nextID: InstructionID) => {
    const metadata: InstructionMetadata = InstructionMetadataList.find(
      (metadata) => metadata.id === nextID
    )!;
    return (
      <Link
        id={ElementID.NextInstruction}
        to={RoutePath.instruction(nextID)}
        style={{ float: "right" }}
      >
        次は {metadata.name} 👉
      </Link>
    );
  };

  return (
    <React.Fragment>
      <div className="instruction-pane">{renderContent()}</div>
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
