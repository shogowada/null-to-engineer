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
import { usePrevious } from "./use-previous";

interface Props {
  id: InstructionID;
  nextInstructionMetadata: InstructionMetadata | null;
  isLoading: boolean;
  html: string | null;
  fetchHTML: (id: InstructionID) => PromiseLike<unknown>;
}

export const ViewInstruction = (props: Props) => {
  const prevHTML: string = usePrevious(props.html) || "";

  React.useEffect(() => {
    props
      .fetchHTML(props.id)
      .then(undefined, (error) =>
        console.error(`${props.id}の読み込みに失敗しました`, error)
      );
  }, [props.id]);

  const renderNextInstructionLink = (
    nextInstructionMetadata: InstructionMetadata
  ) => {
    return (
      <Link
        id={ElementID.NextInstruction}
        to={RoutePath.instruction(nextInstructionMetadata.id)}
        style={{ float: "right" }}
      >
        次は {nextInstructionMetadata.name} 👉
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
        <div dangerouslySetInnerHTML={{ __html: props.html || prevHTML }} />
      </div>
      {props.nextInstructionMetadata &&
        renderNextInstructionLink(props.nextInstructionMetadata)}
    </React.Fragment>
  );
};
