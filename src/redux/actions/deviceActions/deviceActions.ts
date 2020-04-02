import { ADD_DEVICE, LOAD_DEVICES } from '../../../constants/deviceActions';
import { Device } from '../../reducers/deviceReducer';

export interface AddDeviceAction {
    type: typeof ADD_DEVICE;
    payload: Device
}

export const addDevice = (payload: Device): AddDeviceAction => ({
    type: ADD_DEVICE,
    payload
})

interface LoadDevicesAction {
    type: typeof LOAD_DEVICES;
    payload: Device[]
}

export const loadDevices = (payload: Device[]): LoadDevicesAction => ({
    type: LOAD_DEVICES,
    payload
})


export type deviceActions = AddDeviceAction | LoadDevicesAction;