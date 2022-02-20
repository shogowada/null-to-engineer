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
  Chapter,
  Chapters,
  DefaultInstructionID,
  Instruction,
  InstructionID,
  InstructionIDs,
  requireDefined,
} from "../common";
import {
  addInstructionContent,
  AppState,
  createReducer,
} from "../client/presentation";
import { Main } from "../client/gui/components/main";
import { configuration } from "./infrastructure";
import { getInstruction, getInstructionMetadataList } from "./business";

const htmlTemplate: string = fs.readFileSync(
  path.join(configuration.staticDir, "index.html"),
  { encoding: "utf8" }
);

export const handleRender = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const history = createMemoryHistory();

  const store = createStore(createReducer(history), await getInitialState());
  const instruction: Instruction = await getInstructionFromPath(req.path);
  store.dispatch(
    addInstructionContent({
      id: instruction.id,
      html: instruction.html,
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

  res.send(renderFullPage(instruction, html, state));
};

const getInitialState = async (): Promise<PreloadedState<AppState>> => {
  const state: Partial<AppState> = {
    instructionMetadataList: await getInstructionMetadataList(),
  };
  return state as PreloadedState<AppState>;
};

const getInstructionFromPath = (path: string): PromiseLike<Instruction> => {
  return getInstruction(getInstructionID(path));
};

const getInstructionID = (path: string): InstructionID => {
  const groups = /^\/instructions\/(\w+).*$/.exec(path);
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

const renderFullPage = (
  instruction: Instruction,
  html: string,
  state: AppState
): string => {
  return htmlTemplate
    .replace("<!--__META_PLACEHOLDER__-->", renderMeta(instruction))
    .replace("__RENDERED_HTML_PLACEHOLDER__", html)
    .replace(
      '"__PRELOADED_STATE_PLACEHOLDER__"',
      JSON.stringify(state).replace(/</g, "\\u003c")
    );
};

const renderMeta = (instruction: Instruction): string => {
  const chapter: Chapter = requireDefined(
    Chapters.find((chapter) => chapter.instructionIDs.includes(instruction.id)),
    `chapter for ${instruction.id}`
  );

  return ReactDOMServer.renderToString(
    <React.Fragment>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@wada_shogo" />
      <meta
        name="twitter:title"
        content={`${chapter.name} ${instruction.name}`}
      />
      <meta name="twitter:description" content="経験ゼロからエンジニア 💻" />
    </React.Fragment>
  );
};
