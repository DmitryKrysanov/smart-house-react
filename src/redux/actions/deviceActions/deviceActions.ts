import { ADD_DEVICE, 
    REMOVE_ALL_DEVICES, 
    TURN_OFF_ALL_DEVICES,
    TURN_ON_OFF_DEVICE, 
    DECREASE,
    INCREASE,
    SET_MODE,
    REMOVE_DEVICE,
    SET_DEVICES
 } from '../../../constants/deviceActions';
import { RobotHoover, Oven } from '../../reducers/deviceReducer';


export interface AddDeviceAction {
    type: typeof ADD_DEVICE,
    payload: Oven | RobotHoover
}

export const addDevice = (payload: Oven | RobotHoover): AddDeviceAction => ({
    type: ADD_DEVICE,
    payload
})

interface RemoveAllDevicesAction {
    type: typeof REMOVE_ALL_DEVICES;
}

export const RemoveAllDevices = (): RemoveAllDevicesAction => ({
    type: REMOVE_ALL_DEVICES
})

export interface SetDevicesAction {
    type: typeof SET_DEVICES;
    payload: Array<Oven | RobotHoover>
}

export const setDevices = (payload: Array<Oven | RobotHoover>): SetDevicesAction => ({
    type: SET_DEVICES,
    payload
})

interface turnOffAllDevicesAction {
    type: typeof TURN_OFF_ALL_DEVICES
}

export const turnOffAllDevices = (): turnOffAllDevicesAction => ({
    type: TURN_OFF_ALL_DEVICES
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
    payload: Oven
}

export const decrease = (payload: Oven): decreaseAction => ({
    type: DECREASE,
    payload
})

interface increaseAction {
    type: typeof INCREASE,
    payload: Oven
}

export const increase = (payload: Oven): increaseAction => ({
    type: INCREASE,
    payload
})

interface setModeAction {
    type: typeof SET_MODE,
    payload: Oven | RobotHoover
}

export const setMode = (payload: Oven | RobotHoover): setModeAction => ({
    type: SET_MODE,
    payload
})

interface removeDeviceAction {
    type: typeof REMOVE_DEVICE,
    id: number
}

export const removeDevice = (id: number): removeDeviceAction => ({
    type: REMOVE_DEVICE,
    id
})

export type deviceActions = AddDeviceAction 
| RemoveAllDevicesAction
| turnOffAllDevicesAction
| turnOnOffDeviceAction
| decreaseAction
| increaseAction
| setModeAction
| removeDeviceAction
| SetDevicesAction;
