import { loaderActions } from "../actions/loaderActions/loaderActions"
import { SHOW_LOADER, HIDE_LOADER } from "../../constants/loaderActions";

export interface LoaderState {
    isLoading: boolean
}

const initialState: LoaderState = {
    isLoading: false
}

export const loaderReducer = (state = initialState, action: loaderActions): LoaderState => {
    switch(action.type) {
        case SHOW_LOADER:
            return {...state, isLoading: action.payload}
        case HIDE_LOADER:
                return {...state, isLoading: action.payload}
        default:
            return state;
    }
}