import { combineReducers } from "redux";
import { deviceReducer } from './deviceReducer';
import { loaderReducer } from './loaderReducer'


export const rootReducer = combineReducers({deviceReducer, loaderReducer});