import { 
    ADD_DEVICE_FAILED, 
    DEVICE_DELETED, 
    DEVICE_DELETE_FAILED, 
    DEVICE_UPDATED, 
    DEVICE_UPDATE_FAILED 
} from '../../../constants/alertActions';

export interface AddDeviceFailedAction {
    type: typeof ADD_DEVICE_FAILED,
    payload: boolean
}
export const AddDeviceFailed = (payload: boolean): AddDeviceFailedAction => ({
    type: ADD_DEVICE_FAILED,
    payload
})

export interface DeviceDeletedAction {
    type: typeof DEVICE_DELETED,
    payload: boolean
}
export const DeviceDeleted = (payload: boolean): DeviceDeletedAction => ({
    type: DEVICE_DELETED,
    payload
})

export interface DeviceDeleteFailedAction {
    type: typeof DEVICE_DELETE_FAILED,
    payload: boolean
}
export const DeviceDeleteFailed = (payload: boolean): DeviceDeleteFailedAction => ({
    type: DEVICE_DELETE_FAILED,
    payload
})

export interface DeviceUpdatedAction {
    type: typeof DEVICE_UPDATED,
    payload: boolean
}
export const DeviceUpdated = (payload: boolean): DeviceUpdatedAction => ({
    type: DEVICE_UPDATED,
    payload
})

export interface DeviceUpdatedFailedAction {
    type: typeof DEVICE_UPDATE_FAILED,
    payload: boolean
}
export const DeviceUpdatedFailed = (payload: boolean): DeviceUpdatedFailedAction => ({
    type: DEVICE_UPDATE_FAILED,
    payload
})

export type alertActions = AddDeviceFailedAction
    | DeviceDeletedAction
    | DeviceDeleteFailedAction
    | DeviceUpdatedAction
    | DeviceUpdatedFailedAction;
