import { combineReducers } from "redux";
import { deviceReducer } from './deviceReducer';
import { loaderReducer } from './loaderReducer';
import { alertReducer } from './alertReducer';


export const rootReducer = combineReducers({deviceReducer, loaderReducer, alertReducer});