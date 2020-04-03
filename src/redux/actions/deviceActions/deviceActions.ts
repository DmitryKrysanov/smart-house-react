import { ADD_DEVICE, SET_DEVICES } from '../../../constants/deviceActions';
import { Device } from '../../reducers/deviceReducer';
import { showLoader } from '../loaderActions/loaderActions';
import { devicesAPI } from '../../../api/api';
//import { Dispatch } from 'react';
import { Dispatch } from './../../store'

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

export const loadDevicesThunk = () => {
    return async (dispatch: Dispatch) => {
        dispatch(showLoader(true));

        const response = await fetch("https://my-json-server.typicode.com/SvetaShmalko/json-server/devices")
        .then(resp => {
            console.log(resp);
            return resp.json();
        });
      //  const response = devicesAPI.serverDevices();
console.log(response);
        dispatch(setDevices(response));

    }
}


export type deviceActions = AddDeviceAction | SetDevicesAction;