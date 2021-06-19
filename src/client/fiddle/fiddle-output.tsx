import * as React from "react";

interface Props {
  code: string;
}

const createConsoleLite = (onLog: (...args: any[]) => void) => {
  return ["info", "log", "warn", "error", "debug"].reduce(
    (consoleLite, methodName) => {
      return {
        ...consoleLite,
        [methodName]: onLog,
      };
    },
    {}
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

const mapLogArgToLog = (arg: any) => {
  if (typeof arg === "object") {
    return JSON.stringify(arg);
  } else {
    return String(arg);
  }
};

const createFunctionCode = (code: string) => {
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
          type="button"
          onClick={() => {
            setLogs([]);

            const consoleLite = createConsoleLite((...args: any[]) => {
              const log: string | null = mapLogArgsToLog(...args);
              if (log) {
                setLogs((prevState) => [...prevState, log]);
              }
            });

            try {
              window.Function(createFunctionCode(props.code))()(consoleLite);
            } catch (error) {
              setLogs([String(error)]);
            }
          }}
        >
          Run
        </button>
      </div>
      <pre>{logs.join("\n")}</pre>
    </div>
  );
};
