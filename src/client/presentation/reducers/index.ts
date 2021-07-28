import { History } from "history";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { InstructionMetadata } from "../../../common";
import { AppState } from "../app-state";
import { instructionContents } from "./instruction-contents-reducer";
import { instructionIDToCodeDictionary } from "./instruction-id-to-code-dictionary-reducer";

export const createReducer = (history: History) =>
  combineReducers<AppState>({
    instructionContents,
    instructionIDToCodeDictionary,
    instructionMetadataList: (state: InstructionMetadata[] = []) => state,
    router: connectRouter(history),
  });
