import * as React from "react";
import { FiddleType } from "../../../common";
import { JavaScriptFiddle } from "./javascript-fiddle";
import { HTMLFiddle } from "./html-fiddle";

interface Props {
  type: FiddleType;
}

export const Fiddle: React.FunctionComponent<Props> = (props: Props) => {
  switch (props.type) {
    case FiddleType.HTML: {
      return <HTMLFiddle />;
    }
    case FiddleType.JavaScript: {
      return <JavaScriptFiddle />;
    }
    case FiddleType.None: {
      return null;
    }
  }
};
