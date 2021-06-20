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
    props
      .fetchHTML(props.id)
      .then(setHTML, () => setErrorMessage("Failed to fetch instruction"));
  }, [props.id]);

  return (
    <div>
      {errorMessage && <div>{errorMessage}</div>}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};
