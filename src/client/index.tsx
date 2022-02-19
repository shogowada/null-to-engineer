import * as React from "react";
import * as ReactDOM from "react-dom";
import { applyMiddleware, createStore, PreloadedState, Store } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { createBrowserHistory, History } from "history";
import { ConnectedRouter, routerMiddleware } from "connected-react-router";
import { debounce } from "lodash";
import { configuration } from "./infrastructure";
import { AppDispatch, AppState, createReducer } from "./presentation";
import { Main } from "./gui/components/main";
import "./gui/styles/main.scss";

const history: History = createBrowserHistory();

declare global {
  interface Window {
    __PRELOADED_STATE__: Partial<AppState> | undefined;
  }
}

const stateJSON: string | null = localStorage.getItem(configuration.stateKey);
const initialState: PreloadedState<AppState> = {
  ...window.__PRELOADED_STATE__,
  ...JSON.parse(stateJSON ?? "{}"),
};

delete window.__PRELOADED_STATE__;

const store: Store<AppState> & {
  dispatch: AppDispatch;
} = createStore(
  createReducer(history),
  initialState,
  composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)))
);

const saveState = debounce(() => {
  const state: AppState = store.getState();
  const stateToSave: Partial<AppState> = {
    instructionIDToCodeDictionary: state.instructionIDToCodeDictionary,
  };
  localStorage.setItem(configuration.stateKey, JSON.stringify(stateToSave));
}, configuration.saveStateDebounceRate);

store.subscribe(saveState);

const mountDOM = document.getElementById("mount");

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Main />
    </ConnectedRouter>
  </Provider>,
  mountDOM
);
