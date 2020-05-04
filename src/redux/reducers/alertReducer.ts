import { alertActions } from "../actions/alertActions/alertActions";
import { SHOW_ALERT, HIDE_ALERT } from "../../constants/alertActions";

export interface AlertState {
    alert: string
}

const initialState: AlertState = {
    alert: ''
}

export const alertReducer = (state = initialState, action: alertActions): AlertState => {
    switch (action.type) {
        case SHOW_ALERT:
            return { ...state, alert: action.payload }
        case HIDE_ALERT:
            return { ...state, alert: '' }
        default:
            return state;
    }
}