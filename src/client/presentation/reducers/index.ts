import { History } from "history";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { AppState } from "../app-state";

export const createReducer = (history: History) =>
  combineReducers<AppState>({
    router: connectRouter(history),
  });
