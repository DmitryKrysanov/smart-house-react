import { HIDE_LOADER, SHOW_LOADER } from "../../../constants/loaderActions";

interface ShowLoaderAction {
    type: typeof SHOW_LOADER;
}

export const ShowLoader = (): ShowLoaderAction => ({
    type: SHOW_LOADER
})

interface HideLoaderAction {
    type: typeof HIDE_LOADER;
}

export const HideLoader = (): HideLoaderAction => ({
    type: HIDE_LOADER
})

export type loaderActions = ShowLoaderAction | HideLoaderAction ;