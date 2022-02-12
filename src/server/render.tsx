import * as path from "path";
import * as fs from "fs";
import * as express from "express";
import { createMemoryHistory } from "history";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router";
import { createStore, PreloadedState } from "redux";
import { Provider } from "react-redux";
import {
  DefaultInstructionID,
  Instruction,
  InstructionID,
  InstructionIDs,
  InstructionMetadata,
} from "../common";
import {
  addInstructionContent,
  AppState,
  createReducer,
} from "../client/presentation";
import { Main } from "../client/gui/components/main";
import { configuration } from "./configuration";

const htmlTemplate: string = fs.readFileSync(
  path.join(configuration.staticDir, "index.html"),
  { encoding: "utf8" }
);

const instructionMetadataList: InstructionMetadata[] = JSON.parse(
  fs.readFileSync(
    path.join(configuration.staticDir, "instructions", "metadata.json"),
    { encoding: "utf8" }
  )
);

const instructionIDToInstructionMap = new Map<InstructionID, Instruction>(
  InstructionIDs.map((instructionID): [InstructionID, Instruction] => {
    const json: string = fs.readFileSync(
      path.join(
        configuration.staticDir,
        "instructions",
        `${instructionID}.json`
      ),
      { encoding: "utf8" }
    );
    const instruction: Instruction = JSON.parse(json);
    return [instructionID, instruction];
  })
);

export const handleRender = (
  req: express.Request,
  res: express.Response
): void => {
  const history = createMemoryHistory();

  const store = createStore(createReducer(history), getInitialState());
  const instructionID: InstructionID = getInstructionID(req.path);
  store.dispatch(
    addInstructionContent({
      id: instructionID,
      html: instructionIDToInstructionMap.get(instructionID)!.html,
    })
  );

  const html: string = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path}>
        <Main />
      </StaticRouter>
    </Provider>
  );

  const state = store.getState();

  res.send(renderFullPage(html, state));
};

const getInitialState = (): PreloadedState<AppState> => {
  const state: Partial<AppState> = {
    instructionMetadataList,
  };
  return state as PreloadedState<AppState>;
};

const getInstructionID = (path: string): InstructionID => {
  const groups = /^\/instructions\/(\w+)$/.exec(path);
  if (groups) {
    const id: InstructionID = groups[1] as InstructionID;
    if (InstructionIDs.includes(id)) {
      return id;
    } else {
      return DefaultInstructionID;
    }
  } else {
    return DefaultInstructionID;
  }
};

const renderFullPage = (html: string, state: AppState): string => {
  return htmlTemplate
    .replace("__RENDERED_HTML_PLACEHOLDER__", html)
    .replace(
      '"__PRELOADED_STATE_PLACEHOLDER__"',
      JSON.stringify(state).replace(/</g, "\\u003c")
    );
};
