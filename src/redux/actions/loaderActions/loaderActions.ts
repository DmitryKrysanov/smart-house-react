import { HIDE_LOADER, SHOW_LOADER } from "../../../constants/loaderActions";

interface ShowLoaderAction {
    type: typeof SHOW_LOADER;
    payload: boolean
}

export const showLoader = (payload: boolean): ShowLoaderAction => ({
    type: SHOW_LOADER,
    payload
})

interface HideLoaderAction {
    type: typeof HIDE_LOADER;
    payload: boolean
}

export const hideLoader = (payload: boolean): HideLoaderAction => ({
    type: HIDE_LOADER,
    payload
})

export type loaderActions = ShowLoaderAction | HideLoaderAction ;