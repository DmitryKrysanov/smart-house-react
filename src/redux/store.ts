import { rootReducer } from './reducers'
import { createStore, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || 
  compose || 
  applyMiddleware(thunk);

export const Store = createStore(rootReducer, composeEnhancers());

const { dispatch } = Store;

export type Dispatch = typeof dispatch;
