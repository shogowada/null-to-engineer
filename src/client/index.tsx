import * as React from "react";
import * as ReactDOM from "react-dom";
import { applyMiddleware, createStore, PreloadedState, Store } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { createBrowserHistory, History } from "history";
import { ConnectedRouter, routerMiddleware } from "connected-react-router";
import { debounce } from "lodash";
import { appAPIClient, configuration } from "./infrastructure";
import { AppDispatch, AppState, createReducer } from "./presentation";
import { Main } from "./gui/components/main";
import "./gui/styles/main.scss";

const history: History = createBrowserHistory();

const stateJSON: string | null = localStorage.getItem(configuration.stateKey);

appAPIClient
  .getInstructionMetadataList()
  .then(
    (instructionMetadataList): PreloadedState<AppState> => ({
      instructionMetadataList,
      ...JSON.parse(stateJSON || "{}"),
    })
  )
  .then((initialState: PreloadedState<AppState>) => {
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
  });
