import * as React from "react";

interface Props {
  code: string;
}

export const FiddleOutput: React.FunctionComponent<Props> = (props: Props) => {
  const [output, setOutput] = React.useState<string[]>([]);
  return (
    <div>
      <div>
        <button
          type="button"
          onClick={() => {
            setOutput([]);

            try {
              window.Function(`"use strict";
            return (console) => {
              ${props.code}
            };
            `)()({
                log: (message: string) => {
                  setOutput((prevState) => [...prevState, message]);
                },
              });
            } catch (error) {
              setOutput([String(error)]);
            }
          }}
        >
          Run
        </button>
      </div>
      <pre>{output.join("\n")}</pre>
    </div>
  );
};
