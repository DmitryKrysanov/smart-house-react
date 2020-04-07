import { ADD_DEVICE, 
    TURN_OFF_ALL_DEVICES,
    TURN_ON_OFF_DEVICE, 
    DECREASE,
    INCREASE,
    SET_MODE,
    REMOVE_DEVICE,
    SET_DEVICES
 } from '../../../constants/deviceActions';
import { Device, RobotHoover, Oven } from '../../reducers/deviceReducer';


export interface AddDeviceAction {
    type: typeof ADD_DEVICE,
    payload: Oven | RobotHoover
}

export const addDevice = (payload: Oven | RobotHoover): AddDeviceAction => ({
    type: ADD_DEVICE,
    payload
})

interface SetDevicesAction {
    type: typeof SET_DEVICES;
  //  payload: Device[]
}

export const setDevices = (payload: Device[]): SetDevicesAction => ({
    type: SET_DEVICES,
  //  payload
})

interface turnOffAllDevicesAction {
    type: typeof TURN_OFF_ALL_DEVICES
    // payload: Device
}

export const turnOffAllDevices = (): turnOffAllDevicesAction => ({
    type: TURN_OFF_ALL_DEVICES
    // payload
})

interface turnOnOffDeviceAction {
    type: typeof TURN_ON_OFF_DEVICE,
    id: number
}

export const turnOnOffDevice = (id: number): turnOnOffDeviceAction => ({
    type: TURN_ON_OFF_DEVICE,
    id
})

interface decreaseAction {
    type: typeof DECREASE,
    payload: Device
}

export const decrease = (payload: Device): decreaseAction => ({
    type: DECREASE,
    payload
})

interface increaseAction {
    type: typeof INCREASE,
    payload: Device
}

export const increase = (payload: Device): increaseAction => ({
    type: INCREASE,
    payload
})

interface setModeAction {
    type: typeof SET_MODE,
    payload: Device
}

export const setMode = (payload: Device): setModeAction => ({
    type: SET_MODE,
    payload
})

interface removeDeviceAction {
    type: typeof REMOVE_DEVICE,
    payload: Device
}

export const removeDevice = (payload: Device): removeDeviceAction => ({
    type: REMOVE_DEVICE,
    payload
})

export type deviceActions = AddDeviceAction 
| turnOffAllDevicesAction
| turnOnOffDeviceAction
| decreaseAction
| increaseAction
| setModeAction
| removeDeviceAction;
