import * as React from "react";
import { ElementID } from "../../../../common";
import { JavaScriptFiddleEditor } from "./javascript-fiddle-editor";
import { JavaScriptFiddleOutput } from "./javascript-fiddle-output";

export const JavaScriptFiddle: React.FunctionComponent = () => {
  const [code, setCode] = React.useState<string>("");
  const [logs, setLogs] = React.useState<string[]>([]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <JavaScriptFiddleEditor code={code} onChange={setCode} />
      <button
        id={ElementID.JavaScriptFiddleExecute}
        type="button"
        onClick={() => {
          setLogs([]);

          const consoleLite = createConsoleLite(
            (...args: any[]) => {
              const log: string | null = mapLogArgsToLog(...args);
              if (log) {
                setLogs((prevState) => [...prevState, log]);
              }
            },
            () => setLogs([])
          );

          try {
            window.Function(createFunctionCode(code))()(consoleLite);
          } catch (error) {
            setLogs([String(error)]);
          }
        }}
      >
        実行 ▶️
      </button>
      <JavaScriptFiddleOutput logs={logs} />
    </div>
  );
};

const createConsoleLite = (
  onLog: (...args: any[]) => void,
  onClear: () => void
): any => {
  return ["info", "log", "warn", "error", "debug"].reduce(
    (consoleLite, methodName) => {
      return {
        ...consoleLite,
        [methodName]: onLog,
      };
    },
    {
      clear: onClear,
    }
  );
};

const mapLogArgsToLog = (...args: any[]): string | null => {
  if (args.length === 0) {
    return null;
  } else if (args.length === 1) {
    return mapLogArgToLog(args[0]);
  } else {
    return args.map(mapLogArgToLog).join(" ");
  }
};

const mapLogArgToLog = (arg: any): string => {
  if (typeof arg === "object") {
    return JSON.stringify(arg);
  } else {
    return String(arg);
  }
};

const createFunctionCode = (code: string): string => {
  return `"use strict";
return (console) => {
  ${code}
};`;
};
