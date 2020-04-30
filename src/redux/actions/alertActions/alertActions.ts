import { 
    SHOW_ALERT,
    HIDE_ALERT
} from '../../../constants/alertActions';

export interface ShowAlertAction {
    type: typeof SHOW_ALERT,
    payload: string
}

export const showAlert = (payload: string): ShowAlertAction => ({
    type: SHOW_ALERT,
    payload
})

export interface HideAlertAction {
    type: typeof HIDE_ALERT
}

export const hideAlert = (): HideAlertAction => ({
    type: HIDE_ALERT
})

export type alertActions = ShowAlertAction
    | HideAlertAction