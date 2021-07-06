import * as React from "react";
import { InstructionID, InstructionIDs } from "../../../common";
import { ConnectedViewInstruction } from "../containers/connected-view-instruction";
import { JavaScriptFiddle } from "./javascript-fiddle";
import { ConnectedViewChapters } from "../containers/connected-view-chapters";
import { createClassName } from "./create-class-name";
import { useLocation } from "react-router";

interface Props {
  match: {
    params: { id?: string };
  };
}

enum Tab {
  Chapters = "目次",
  Instruction = "記事",
  Fiddle = "コードエディタ",
}

export const Home: React.FunctionComponent<Props> = (props: Props) => {
  const { pathname, hash } = useLocation();

  const instructionID: InstructionID = React.useMemo(
    () =>
      InstructionIDs.find((id) => id === props.match.params.id) ||
      InstructionID.JavaScriptBasics,
    [props.match.params.id]
  );

  const [currentTab, setCurrentTab] = React.useState<Tab>(Tab.Instruction);

  React.useEffect(() => {
    setCurrentTab(Tab.Instruction);
  }, [pathname, hash]);

  return (
    <div className="main-container">
      <div className="item-tabs">
        {[Tab.Chapters, Tab.Instruction, Tab.Fiddle].map((tab) => {
          return (
            <button
              key={tab}
              type="button"
              className={tab === currentTab ? "selected" : undefined}
              onClick={() => setCurrentTab(tab)}
            >
              {tab}
            </button>
          );
        })}
      </div>
      <div
        className={createClassName([
          "item-chapters",
          currentTab === Tab.Chapters ? "visible" : "hidden",
        ])}
      >
        <ConnectedViewChapters selectedInstructionID={instructionID} />
      </div>
      <div
        className={createClassName([
          "item-instruction",
          currentTab === Tab.Instruction ? "visible" : "hidden",
        ])}
      >
        <ConnectedViewInstruction id={instructionID} />
      </div>
      <div
        className={createClassName([
          "item-fiddle",
          currentTab === Tab.Fiddle ? "visible" : "hidden",
        ])}
      >
        <JavaScriptFiddle />
      </div>
    </div>
  );
};
