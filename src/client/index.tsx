import * as React from "react";
import * as ReactDOM from "react-dom";
import { applyMiddleware, createStore, PreloadedState, Store } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { createBrowserHistory, History } from "history";
import { ConnectedRouter, routerMiddleware } from "connected-react-router";
import { AppDispatch, AppState, createReducer } from "./presentation";
import { Main } from "./gui/components/main";
import "./gui/styles/main.scss";

const history: History = createBrowserHistory();

declare global {
  interface Window {
    __PRELOADED_STATE__?: PreloadedState<AppState>;
  }
}

const store: Store<AppState> & {
  dispatch: AppDispatch;
} = createStore(
  createReducer(history),
  window.__PRELOADED_STATE__,
  composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)))
);

delete window.__PRELOADED_STATE__;

const mountDOM = document.getElementById("mount");

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Main />
    </ConnectedRouter>
  </Provider>,
  mountDOM
);
