import { loaderActions } from "../actions/loaderActions/loaderActions"
import { SHOW_LOADER, HIDE_LOADER } from "../../constants/loaderActions";

export interface LoaderState {
    isLoad: boolean
}

const initialState: LoaderState = {
    isLoad: false
}

export const loaderReducer = (state = initialState, action: loaderActions): LoaderState => {
    switch(action.type) {
        case SHOW_LOADER:
            return {...state, isLoad: true}
        case HIDE_LOADER:
            return {...state, isLoad: false}
        default:
            return state;
    }
}