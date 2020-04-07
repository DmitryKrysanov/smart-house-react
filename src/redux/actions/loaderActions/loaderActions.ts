import { SHOW_LOADER, HIDE_LOADER } from "../../../constants/loaderActions";

interface ShowLoaderAction {
    type: typeof SHOW_LOADER;
}

interface HideLoaderAction {
    type: typeof HIDE_LOADER;
}

export const showLoader = (): ShowLoaderAction => ({
    type: SHOW_LOADER
})

export const hideLoader = (): HideLoaderAction => ({
    type: HIDE_LOADER
})


export type loaderActions = ShowLoaderAction | HideLoaderAction ;