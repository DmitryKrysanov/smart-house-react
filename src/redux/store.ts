import { rootReducer } from './reducers'
import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas';
import { watchFetchDevices } from './sagas/saga';


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
  compose ||
  applyMiddleware(sagaMiddleware);

export const Store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

const { dispatch } = Store;

export type Dispatch = typeof dispatch;
