import * as React from "react";
import { InstructionID } from "../../../common";

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

  return (
    <div className="instruction-pane">
      {errorMessage && <div>{errorMessage}</div>}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};
