import * as React from "react";
import * as ReactDOM from "react-dom";
import { applyMiddleware, createStore, Store } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { createBrowserHistory, History } from "history";
import { ConnectedRouter, routerMiddleware } from "connected-react-router";
import { AppDispatch, AppState, createReducer } from "./presentation";
import { Main } from "./gui/components/main";
import "./gui/styles/main.scss";

const history: History = createBrowserHistory();

const store: Store<AppState> & {
  dispatch: AppDispatch;
} = createStore(
  createReducer(history),
  composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)))
);

const mountDOM = document.createElement("div");
document.body.appendChild(mountDOM);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Main />
    </ConnectedRouter>
  </Provider>,
  mountDOM
);
