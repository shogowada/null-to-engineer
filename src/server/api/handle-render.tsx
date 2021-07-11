import * as path from "path";
import * as fs from "fs";
import { Request, Response } from "express";
import { createMemoryHistory } from "history";
import { createStore } from "redux";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { Provider } from "react-redux";
import { ConnectedRouter, push } from "connected-react-router";
import { Instruction, InstructionContent, InstructionID } from "../../common";
import { configuration } from "../infrastructure";
import { getInstruction } from "../business";
import {
  addInstructionContent,
  createReducer,
} from "../../client/presentation";
import { Main } from "../../client/gui/components/main";

export const handleRender = (req: Request, res: Response) => {
  res.send(render(req.path));
};

const indexTemplateHTML: string = fs.readFileSync(
  path.join(configuration.publicDir, "index.template.html"),
  "utf8"
);

const render = (path: string): string => {
  const history = createMemoryHistory();
  const store = createStore(createReducer(history));

  store.dispatch(push(path));
  const instructionContent: InstructionContent | null =
    getInstructionContent(path);
  if (instructionContent) {
    store.dispatch(addInstructionContent(instructionContent));
  }

  const html: string = ReactDOMServer.renderToString(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Main />
      </ConnectedRouter>
    </Provider>
  );

  const preloadedState: string = JSON.stringify(store.getState()).replace(
    /</g,
    "\\u003c"
  );

  return indexTemplateHTML
    .replace('<div id="html-to-be-injected"></div>', html)
    .replace('"preloaded-state-to-be-injected"', preloadedState);
};

const getInstructionContent = (path: string): InstructionContent | null => {
  const instructionID: InstructionID | null = getInstructionID(path);
  if (instructionID) {
    const instruction: Instruction = getInstruction(instructionID);
    return {
      id: instructionID,
      html: instruction.html,
    };
  } else {
    return null;
  }
};

const getInstructionID = (path: string): InstructionID | null => {
  const groups = /^\/instructions\/(\w+).*$/.exec(path);
  if (groups) {
    return groups[1] as InstructionID;
  } else {
    return null;
  }
};
