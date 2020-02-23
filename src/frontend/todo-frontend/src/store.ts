import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";

import { todosReducer, todosReducerState } from "./reducers/todos";
import { visibilityFilterReducer } from "./reducers/visibilityFilter";

export type AppState = {
  todosReducer: todosReducerState;
  visibilityFilterReducer: string;
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers<AppState>({
    todosReducer: todosReducer,
    visibilityFilterReducer: visibilityFilterReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
