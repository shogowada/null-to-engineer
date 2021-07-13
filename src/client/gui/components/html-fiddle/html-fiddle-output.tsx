import * as React from "react";
import { ElementID } from "../../../../common";

interface Props {
  html: string;
}

export const HTMLFiddleOutput: React.FunctionComponent<Props> = (
  props: Props
) => {
  // In context of executing the code declaring the same global variables from previous run
  // facing JavaScript context is not reset on each run, resulting in conflict of global variables between runs
  // we decided to keep track of the code updates
  // to achieve force recreating the iframe on each run by changing its key each time
  // accepting that the code becomes less self-explanatory
  const [updateCount, setUpdateCount] = React.useState<number>(0);

  React.useEffect(() => {
    setUpdateCount((prevState) => prevState + 1);
  }, [props.html]);

  React.useEffect(() => {
    const iFrame: HTMLIFrameElement = document.getElementById(
      ElementID.HTMLFiddleOutput
    )! as HTMLIFrameElement;
    iFrame.contentWindow!.document.open();
    iFrame.contentWindow!.document.write(props.html);
    iFrame.contentWindow!.document.close();
  }, [updateCount]);

  return (
    <iframe
      key={updateCount}
      id={ElementID.HTMLFiddleOutput}
      className="fiddle-output"
    />
  );
};
