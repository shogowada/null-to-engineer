import * as React from "react";
import { ConsoleLog, ConsoleLogLevel, ConsoleLogLevels } from "../../../common";

export interface CompileHTMLOptions {
  html?: string;
  css?: string;
  javaScript?: string;
}

const ConsoleLogMessageSource = "html-fiddle-iframe";
interface ConsoleLogMessage {
  source: typeof ConsoleLogMessageSource;
  type: ConsoleLogLevel | "clear";
  args: any[];
}

const CSSType = "text/css";
const JavaScriptType = "text/javascript";

interface UseCompiledHTMLOptions {
  javaScriptType?: string;
}

export const useCompiledHTML = ({
  javaScriptType = JavaScriptType,
}: UseCompiledHTMLOptions = {}): [
  string,
  ConsoleLog[],
  (options: CompileHTMLOptions) => void
] => {
  const [compiledHTML, setCompiledHTML] = React.useState<string>("");
  const [cssObjectURL, setCSSObjectURL] = React.useState<string | null>(null);
  const [javaScriptObjectURL, setJavaScriptObjectURL] = React.useState<
    string | null
  >(null);
  const [logJavaScriptObjectURL, setLogJavaScriptObjectURL] = React.useState<
    string | null
  >(null);
  const [consoleLogs, setConsoleLogs] = React.useState<ConsoleLog[]>([]);

  const onConsoleLogMessage = React.useCallback((event: MessageEvent) => {
    if (
      event.origin !== location.origin ||
      !event.data ||
      event.data.source !== ConsoleLogMessageSource
    ) {
      return;
    }
    const data: ConsoleLogMessage = event.data;
    if (data.type === "clear") {
      setConsoleLogs([]);
    } else {
      const newLog = mapLogArgsToLog(data.type, data.args);
      if (newLog) {
        setConsoleLogs((prevLogs) => [...prevLogs, newLog]);
      }
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener("message", onConsoleLogMessage);
    setLogJavaScriptObjectURL(createURL(LogJavaScript, JavaScriptType));
    return () => {
      window.removeEventListener("message", onConsoleLogMessage);
      URL.revokeObjectURL(logJavaScriptObjectURL!);
    };
  }, []);

  React.useEffect(() => {
    return () => {
      if (cssObjectURL !== null) {
        URL.revokeObjectURL(cssObjectURL);
      }
    };
  }, [cssObjectURL]);

  React.useEffect(() => {
    return () => {
      if (javaScriptObjectURL !== null) {
        URL.revokeObjectURL(javaScriptObjectURL);
      }
    };
  }, [javaScriptObjectURL]);

  const compileHTML = ({ html, css, javaScript }: CompileHTMLOptions): void => {
    const cssObjectURL = createURL(css || "", CSSType);

    javaScript = createJavaScript(javaScript || "");
    const javaScriptObjectURL = createURL(javaScript, javaScriptType);

    setCSSObjectURL(cssObjectURL);
    setJavaScriptObjectURL(javaScriptObjectURL);

    const linkElement: string = `<link rel="stylesheet" type="${CSSType}" href="${cssObjectURL}">`;
    const logScriptElement: string = `<script type="${JavaScriptType}" src="${logJavaScriptObjectURL}"></script>`;
    const scriptElement: string = `<script defer type="${javaScriptType}" src="${javaScriptObjectURL}"></script>`;

    setConsoleLogs([]);
    setCompiledHTML(`${linkElement}
    ${logScriptElement}
${scriptElement}
${html || ""}`);
  };

  return [compiledHTML, consoleLogs, compileHTML];
};

const createURL = (input: string, type: string): string => {
  const blob = new Blob([input], { type });
  return URL.createObjectURL(blob);
};

const createJavaScript = (javaScript: string): string => {
  return `"use strict";
${javaScript}`;
};

const LogJavaScript = createJavaScript(`${JSON.stringify(
  ConsoleLogLevels
)}.map(level => {
  const original = console[level];
  console[level] = function() {
    original.apply(this, arguments);
    window.parent.postMessage({
      source: ${JSON.stringify(ConsoleLogMessageSource)},
      type: level,
      args: Array.from(arguments)
    }, location.origin);
  };
});

const original = console.clear;
console.clear = function() {
  original.apply(this, arguments);
  window.parent.postMessage({
    source: ${JSON.stringify(ConsoleLogMessageSource)},
    type: "clear"
  }, location.origin);
};

window.addEventListener("error", (event) => {
  window.parent.postMessage({
    source: ${JSON.stringify(ConsoleLogMessageSource)},
    type: ${JSON.stringify(ConsoleLogLevel.Error)},
    args: [event.message]
  }, location.origin);
});`);

const mapLogArgsToLog = (
  level: ConsoleLogLevel,
  args: any[]
): ConsoleLog | null => {
  if (args.length === 0) {
    return null;
  } else {
    return {
      level,
      message: args.map(mapLogArgToLog).join(" "),
    };
  }
};

const mapLogArgToLog = (arg: any): string => {
  if (typeof arg === "object") {
    return JSON.stringify(arg);
  } else {
    return String(arg);
  }
};
