import * as React from "react";
import { FiddleType, getInstructionConfiguration } from "../../../common";
import { Code } from "../../presentation";
import { JavaScriptFiddle } from "./javascript-fiddle";
import { HTMLFiddle } from "./html-fiddle";
import { HTMLWithCSSFiddle } from "./html-with-css-fiddle";
import { JavaScriptHTMLCSSFiddle } from "./javascript-html-css-fiddle";

interface Props {
  code: Code;
  setCode: (code: Code) => void;
}

export const Fiddle: React.FunctionComponent<Props> = (props: Props) => {
  const fiddleType: FiddleType = React.useMemo(
    () => getInstructionConfiguration(props.code.instructionID).fiddleType,
    [props.code.instructionID]
  );

  const javaScript: string = props.code.javaScript || "";
  const html: string = props.code.html || "";
  const css: string = props.code.css || "";

  const setJavaScript = (javaScript: string): void => {
    props.setCode({
      ...props.code,
      javaScript,
    });
  };

  const setHTML = (html: string): void => {
    props.setCode({
      ...props.code,
      html,
    });
  };

  const setCSS = (css: string): void => {
    props.setCode({
      ...props.code,
      css,
    });
  };

  switch (fiddleType) {
    case FiddleType.HTML: {
      return <HTMLFiddle html={html} setHTML={setHTML} />;
    }
    case FiddleType.HTMLWithCSS: {
      return (
        <HTMLWithCSSFiddle
          html={html}
          css={css}
          setHTML={setHTML}
          setCSS={setCSS}
        />
      );
    }
    case FiddleType.JavaScript: {
      return (
        <JavaScriptFiddle
          javaScript={javaScript}
          setJavaScript={setJavaScript}
        />
      );
    }
    case FiddleType.JavaScriptHTMLCSS: {
      return (
        <JavaScriptHTMLCSSFiddle
          javaScript={javaScript}
          html={html}
          css={css}
          setJavaScript={setJavaScript}
          setHTML={setHTML}
          setCSS={setCSS}
        />
      );
    }
    case FiddleType.None: {
      return null;
    }
  }
};
