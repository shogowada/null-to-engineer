import { History } from "history";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { AppState } from "../app-state";
import { instructionContents } from "./instruction-contents-reducer";

export const createReducer = (history: History) =>
  combineReducers<AppState>({
    instructionContents,
    router: connectRouter(history),
  });
