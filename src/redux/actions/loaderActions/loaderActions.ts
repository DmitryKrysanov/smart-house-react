import { SHOW_LOADER } from "../../../constants/loaderActions";

interface ShowLoaderAction {
    type: typeof SHOW_LOADER;
    payload: boolean
}

export const showLoader = (payload: boolean): ShowLoaderAction => ({
    type: SHOW_LOADER,
    payload
})


export type loaderActions = ShowLoaderAction ;