import * as React from "react";
import {
  DefaultInstructionID,
  InstructionID,
  InstructionIDs,
} from "../../../common";
import { ConnectedViewInstruction } from "../containers/connected-view-instruction";
import { ConnectedViewChapters } from "../containers/connected-view-chapters";
import { createClassName } from "./create-class-name";
import { useLocation } from "react-router";
import { SideTab } from "./side-tab";
import { ConnectedFiddle } from "../containers/connected-fiddle";

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
      DefaultInstructionID,
    [props.match.params.id]
  );

  const [currentTab, setCurrentTab] = React.useState<Tab>(Tab.Instruction);

  React.useEffect(() => {
    setCurrentTab(Tab.Instruction);
  }, [pathname, hash]);

  const renderSideTabs = () => {
    switch (currentTab) {
      case Tab.Chapters: {
        return (
          <SideTab
            text={Tab.Instruction}
            side="right"
            onClick={() => setCurrentTab(Tab.Instruction)}
          />
        );
      }
      case Tab.Instruction: {
        return (
          <React.Fragment>
            <SideTab
              text={Tab.Chapters}
              side="left"
              onClick={() => setCurrentTab(Tab.Chapters)}
            />
            <SideTab
              text={Tab.Fiddle}
              side="right"
              onClick={() => setCurrentTab(Tab.Fiddle)}
            />
          </React.Fragment>
        );
      }
      case Tab.Fiddle: {
        return (
          <SideTab
            text={Tab.Instruction}
            side="left"
            onClick={() => setCurrentTab(Tab.Instruction)}
          />
        );
      }
    }
  };

  return (
    <div className="main-container">
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
        <ConnectedFiddle instructionID={instructionID} />
      </div>
      {renderSideTabs()}
    </div>
  );
};
