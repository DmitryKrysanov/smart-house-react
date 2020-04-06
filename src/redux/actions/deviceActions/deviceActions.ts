import { ADD_DEVICE, SET_DEVICES } from '../../../constants/deviceActions';
import { Device } from '../../reducers/deviceReducer';
import { showLoader, hideLoader } from '../loaderActions/loaderActions';
import { devicesAPI } from '../../../api/api';
//import { Dispatch } from 'react';
import { Dispatch } from './../../store'
import { ThunkAction } from 'redux-thunk';
import { rootReducer } from '../../reducers';

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

export interface AddDeviceAction {
    type: typeof ADD_DEVICE;
    payload: Device
}

export const addDevice = (payload: Device): AddDeviceAction => ({
    type: ADD_DEVICE,
    payload
})

interface SetDevicesAction {
    type: typeof SET_DEVICES;
    payload: Device[]
}

export const setDevices = (payload: Device[]): SetDevicesAction => ({
    type: SET_DEVICES,
    payload
})


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, deviceActions>

export const requestDevices = (): ThunkType => {
    return async (dispatch, getState) => {

        let data = await devicesAPI.serverDevices();
        dispatch(setDevices(data));

    }
}

// export const loadDevicesThunk = () => {
//     return async (dispatch: Dispatch) => {
//         dispatch(showLoader());
//         const response = await fetch("https://my-json-server.typicode.com/SvetaShmalko/json-server/devices");
//         const json = await response.json();
//         dispatch({
//             type: SET_DEVICES, 
//             payload: json
//         });
//         dispatch(hideLoader());

//     }
// }


export type deviceActions = AddDeviceAction | SetDevicesAction;