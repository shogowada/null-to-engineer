import * as React from "react";
import { ElementID } from "../../../../common";
import { ConsoleLog } from "../create-html";
import { createClassName } from "../create-class-name";

interface Props {
  html: string;
  logs: ConsoleLog[];
  logOnly?: boolean;
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
  const [lastUpdatedCount, setLastUpdatedCount] = React.useState<number>(0);
  const iFrameRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    setUpdateCount((prevState) => prevState + 1);
  }, [props.html]);

  React.useEffect(() => {
    if (iFrameRef.current && updateCount !== lastUpdatedCount) {
      const iFrame: HTMLIFrameElement = iFrameRef.current;
      iFrame.contentWindow!.document.open();
      iFrame.contentWindow!.document.write(props.html);
      iFrame.contentWindow!.document.close();
      setLastUpdatedCount(updateCount);
    }
  }, [iFrameRef.current, updateCount]);

  if (props.logOnly) {
    return (
      <pre
        id={ElementID.JavaScriptFiddleOutput}
        className={createClassName([
          "fiddle-output",
          props.logs.length ? "" : "empty",
        ])}
      >
        {props.logs.length
          ? props.logs.join("\n")
          : "コードを実行すると、結果がここに表示されるよ👀"}
      </pre>
    );
  } else {
    return (
      <iframe
        key={updateCount}
        ref={iFrameRef}
        id={ElementID.HTMLFiddleOutput}
        className="fiddle-output"
      />
    );
  }
};
