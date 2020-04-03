import { loaderActions } from "../actions/loaderActions/loaderActions"
import { SHOW_LOADER } from "../../constants/loaderActions";

export interface LoaderState {
    isLoad: boolean
}

const initialState: LoaderState = {
    isLoad: true
}

export const loaderReducer = (state = initialState, action: loaderActions): LoaderState => {
    switch(action.type) {
        case SHOW_LOADER:
            return {...state, isLoad: action.payload}
        default:
            return state;
    }
}