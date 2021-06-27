import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "./app-state";

export type AppDispatch = ThunkDispatch<AppState, undefined, AnyAction>;
