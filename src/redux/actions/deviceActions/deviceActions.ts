import {
    ADD_DEVICE,
    TURN_OFF_ALL_DEVICES,
    TURN_ON_OFF_DEVICE,
    UPDATE_DEVICE,
    REMOVE_DEVICE,
    SET_DEVICES,
    SET_CURRENT_PAGE,
    FETCH_DEVICES
} from '../../../constants/deviceActions';
import { RobotHoover, Oven } from '../../reducers/deviceReducer';

export interface FetchDevicesAction {
    type: typeof FETCH_DEVICES
}

export const fetchDevices = (): FetchDevicesAction => ({
    type: FETCH_DEVICES
})

export interface SetCurrentPageAction {
    type: typeof SET_CURRENT_PAGE,
    payload: number
}

export const SetCurrentPage = (payload: number): SetCurrentPageAction => ({
    type: SET_CURRENT_PAGE,
    payload
})

export interface AddDeviceAction {
    type: typeof ADD_DEVICE,
    payload: Oven | RobotHoover
}

export const addDevice = (payload: Oven | RobotHoover): AddDeviceAction => ({
    type: ADD_DEVICE,
    payload
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

interface updateDeviceAction {
    type: typeof UPDATE_DEVICE,
    payload: Oven | RobotHoover
}

export const updateDevice = (payload: Oven | RobotHoover): updateDeviceAction => ({
    type: UPDATE_DEVICE,
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
    | turnOffAllDevicesAction
    | turnOnOffDeviceAction
    | updateDeviceAction
    | removeDeviceAction
    | SetDevicesAction
    | SetCurrentPageAction
    | FetchDevicesAction;
