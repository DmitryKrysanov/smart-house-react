// import Home from '../models/Home';
// import Oven from '../models/Oven';
// import WashingMachine from '../models/WashingMachine';
// import RangeTemp from '../models/Range';
// import Mode from '../models/Mode';
import { rootReducer } from './reducers'

// const home = new Home('home')

// home.addDevice(new Oven(
//   'Bosch', 
//   1, 
//   'https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687', 
//   new RangeTemp(10, 240, 20, 10), 
//   new Mode(['mode1', 'mode2']))
// );

// home.addDevice(new Oven(
//   'Redmond', 
//   2, 
//   'https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687', 
//   new RangeTemp(10, 180, 40, 20), 
//   new Mode(['mode3', 'mode4']))
// );

// home.addDevice(new WashingMachine(
//   'Indesit', 
//   3, 
//   'https://iso.500px.com/wp-content/uploads/2017/08/500px_Class_Quest_Sharon_Wan.jpg', 
//   new RangeTemp(10, 100, 20, 20), 
//   1000,
//   new Mode(['mode5', 'mode6', 'mode7', 'mode8']))
// );

// export default home;


import { createStore, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

//const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || 
  compose || 
  applyMiddleware(thunk);

export const Store = createStore(rootReducer, composeEnhancers());

//sagaMiddleware.run(rootSaga);

const { dispatch } = Store;

export type Dispatch = typeof dispatch;
