import { ADD_DEVICE, REMOVE_ALL_DEVICES, LOAD_DEVICES } from '../../../constants/deviceActions';
import { Device } from '../../reducers/deviceReducer';

export interface AddDeviceAction {
    type: typeof ADD_DEVICE;
    payload: Device
}

export const addDevice = (payload: Device): AddDeviceAction => ({
    type: ADD_DEVICE,
    payload
})

interface RemoveAllDevicesAction {
    type: typeof REMOVE_ALL_DEVICES;
}

export const RemoveAllDevices = (): RemoveAllDevicesAction => ({
    type: REMOVE_ALL_DEVICES
})


interface LoadDevicesAction {
    type: typeof LOAD_DEVICES;
    payload: Device[]
}

export const LoadDevices = (payload: Device[]): LoadDevicesAction => ({
    type: LOAD_DEVICES,
    payload
})


export type deviceActions = AddDeviceAction | RemoveAllDevicesAction | LoadDevicesAction;