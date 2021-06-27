import * as React from "react";
import { ElementID } from "../../../../common";

interface Props {
  code: string;
}

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

export const FiddleOutput: React.FunctionComponent<Props> = (props: Props) => {
  const [logs, setLogs] = React.useState<string[]>([]);

  return (
    <div>
      <div>
        <button
          id={ElementID.FiddleExecute}
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
              window.Function(createFunctionCode(props.code))()(consoleLite);
            } catch (error) {
              setLogs([String(error)]);
            }
          }}
        >
          実行
        </button>
      </div>
      <pre id={ElementID.FiddleOutput}>{logs.join("\n")}</pre>
    </div>
  );
};
