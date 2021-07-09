import * as React from "react";
import { ElementID } from "../../../../common";

interface Props {
  html: string;
}

export const HTMLFiddleOutput: React.FunctionComponent<Props> = (
  props: Props
) => {
  const iFrameRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    if (iFrameRef.current) {
      const iFrame: HTMLIFrameElement = iFrameRef.current;
      iFrame.contentWindow!.document.open();
      iFrame.contentWindow!.document.write(props.html);
      iFrame.contentWindow!.document.close();
    }
  }, [iFrameRef.current, props.html]);

  return (
    <iframe
      id={ElementID.HTMLFiddleOutput}
      ref={iFrameRef}
      className="fiddle-output"
    />
  );
};
