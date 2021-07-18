import { History } from "history";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { InstructionMetadata } from "../../../common";
import { AppState } from "../app-state";
import { instructionContents } from "./instruction-contents-reducer";

export const createReducer = (history: History) =>
  combineReducers<AppState>({
    instructionContents,
    instructionMetadataList: (state: InstructionMetadata[] = []) => state,
    router: connectRouter(history),
  });
