import * as React from "react";
import { ConsoleLog } from "../../../../common";
import { createClassName } from "../create-class-name";
import { ConsoleLogOutput } from "./console-log-output";
import { HTMLOutput } from "./html-output";

interface Props {
  html: string;
  logs: ConsoleLog[];
  logOnly?: boolean;
}

enum Tab {
  HTML = "HTML",
  ConsoleLog = "ConsoleLog",
}

const Tabs: Tab[] = [Tab.HTML, Tab.ConsoleLog];

const mapTabToDisplayText = (tab: Tab): string => {
  switch (tab) {
    case Tab.ConsoleLog: {
      return "コンソールログ";
    }
    default: {
      return tab;
    }
  }
};

export const HTMLFiddleOutput: React.FunctionComponent<Props> = (
  props: Props
) => {
  const [currentTab, setCurrentTab] = React.useState<Tab>(() =>
    props.logOnly ? Tab.ConsoleLog : Tab.HTML
  );

  React.useEffect(() => {
    if (props.logOnly) {
      setCurrentTab(Tab.ConsoleLog);
    } else {
      setCurrentTab(Tab.HTML);
    }
  }, [props.logOnly]);

  if (props.logOnly) {
    return (
      <div className="fiddle-output-container">
        <ConsoleLogOutput logs={props.logs} />
        <HTMLOutput html={props.html} headless />
      </div>
    );
  } else {
    return (
      <div className="fiddle-output-container">
        <ul className="tabs">
          {Tabs.map((tab) => (
            <li
              key={tab}
              className={createClassName([
                "tab",
                tab === currentTab ? "selected" : null,
              ])}
            >
              <button
                type="button"
                onClick={() => {
                  setCurrentTab(tab);
                }}
                data-tab={tab}
              >
                {mapTabToDisplayText(tab)}
              </button>
            </li>
          ))}
        </ul>
        <div
          className={createClassName([
            "tab-content",
            currentTab === Tab.HTML ? "visible" : null,
          ])}
        >
          <HTMLOutput html={props.html} />
        </div>
        <div
          className={createClassName([
            "tab-content",
            currentTab === Tab.ConsoleLog ? "visible" : null,
          ])}
        >
          <ConsoleLogOutput logs={props.logs} />
        </div>
      </div>
    );
  }
};
