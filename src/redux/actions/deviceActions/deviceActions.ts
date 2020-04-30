import {
    ADD_DEVICE,
    TURN_OFF_ALL_DEVICES,
    TURN_ON_OFF_DEVICE,
    UPDATE_DEVICE,
    REMOVE_DEVICE,
    SET_DEVICES,
    SET_CURRENT_PAGE,
    FETCH_DEVICES,
    SET_DEVICES_TYPE,
    SET_TOTAL_ITEMS,
    ADD_SAGA_OVEN,
    ADD_SAGA_ROBOT,
    FILTER_DEVICES,
    UPDATE_ROBOT,
    UPDATE_OVEN
} from '../../../constants/deviceActions';
import { RobotHoover, Oven } from '../../reducers/deviceReducer';
import { PostOven, PostRobot } from '../../../api/api';

export interface SetTotalItemsAction {
    type: typeof SET_TOTAL_ITEMS,
    payload: number
}

export const setTotalItems = (payload: number): SetTotalItemsAction => ({
    type: SET_TOTAL_ITEMS,
    payload
})

export interface SetDevicesTypeAction {
    type: typeof SET_DEVICES_TYPE,
    payload: string
}

export const setDevicesType = (payload: string): SetDevicesTypeAction => ({
    type: SET_DEVICES_TYPE,
    payload
})

export interface FetchDevicesAction {
    type: typeof FETCH_DEVICES
}

export const fetchDevices = (): FetchDevicesAction => ({
    type: FETCH_DEVICES
})

export interface FilterDevicesAction {
    type: typeof FILTER_DEVICES
    payload: {
        page: number,
        type: string
    }
}

export const filterSagaDevices = (payload: { page: number, type: string }): FilterDevicesAction => ({
    type: FILTER_DEVICES,
    payload
})

export interface AddSagaOvenAction {
    type: typeof ADD_SAGA_OVEN,
    payload: PostOven
}

export const addSagaOven = (payload: PostOven): AddSagaOvenAction => ({
    type: ADD_SAGA_OVEN,
    payload
})

export interface AddSagaRobotAction {
    type: typeof ADD_SAGA_ROBOT,
    payload: PostRobot
}

export const addSagaRobot = (payload: PostRobot): AddSagaRobotAction => ({
    type: ADD_SAGA_ROBOT,
    payload
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

export interface UpdateRobotAction {
    type: typeof UPDATE_ROBOT,
    payload: {
        device: PostRobot,
        id: number
    }
}

export const updateRobot = (payload: { device: PostRobot, id: number }): UpdateRobotAction => ({
    type: UPDATE_ROBOT,
    payload
})

export interface UpdateOvenAction {
    type: typeof UPDATE_OVEN,
    payload: {
        device: PostOven,
        id: number
    }
}

export const updateOven = (payload: { device: PostOven, id: number }): UpdateOvenAction => ({
    type: UPDATE_OVEN,
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
    | FetchDevicesAction
    | SetDevicesTypeAction
    | SetTotalItemsAction
    | AddSagaOvenAction
    | AddSagaRobotAction
    | FilterDevicesAction
    | UpdateOvenAction
    | UpdateRobotAction;
