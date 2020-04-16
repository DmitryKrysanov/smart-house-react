import { deviceActions } from './../actions/deviceActions/deviceActions';
import {
    ADD_DEVICE,
    SET_DEVICES,
    TURN_OFF_ALL_DEVICES,
    TURN_ON_OFF_DEVICE,
    REMOVE_DEVICE,
    SET_CURRENT_PAGE,
    SET_DEVICES_TYPE,
    SET_TOTAL_ITEMS
} from '../../constants/deviceActions';

export interface DevicesState {
    devices: Array<Oven | RobotHoover>,
    totalPages: number,
    page: number,
    perPage: number,
    devicesType: string,
    totalItems: number
}

export interface Device {
    type: string,
    name: string,
    id: number,
    image: string,
    status: boolean
}

export interface Oven extends Device {
    temp: {
        min: number,
        max: number,
        current: number,
        step: number,
    },
    modes: string[]
    currentMode: string
}

export interface RobotHoover extends Device {
    modes: string[],
    currentMode: string
}

export const offAllDevices = (devices: Array<Oven | RobotHoover>) => {
    return devices.map((device: any) => {
        return {
            ...device,
            status: false
        }
    })
}

export const findAndDelete = (devices: Array<Oven | RobotHoover>, deviceId: number) => {
    const device = devices.find(device => device.id === deviceId);
    if (device) {
        const index = devices.indexOf(device);
        devices.splice(index, 1);
    }
    return devices
}

export const toggleStatus = (devices: Array<Oven | RobotHoover>, deviceId: number) => {
    console.log(deviceId)
    return devices.map(device => {
        if (device.id === deviceId) {
            return {
                ...device,
                status: !device.status
            }
        }
        return device;
    })
}

const initialState: DevicesState = {
    devices: [],
    totalPages: 1,
    page: 1,
    perPage: 4,
    devicesType: '',
    totalItems: 0
}

export const deviceReducer = (state = initialState, action: deviceActions): DevicesState => {
    switch (action.type) {
        case SET_TOTAL_ITEMS:
            return {
                ...state, totalItems: action.payload
            };

        case SET_DEVICES_TYPE:
            return {
                ...state, devicesType: action.payload
            };

        case ADD_DEVICE:
            return { ...state, devices: [...state.devices, action.payload] };

        case SET_DEVICES:
            return { ...state, devices: action.payload };


        case TURN_OFF_ALL_DEVICES:
            return {
                ...state,
                devices: offAllDevices(state.devices)
            }

        case TURN_ON_OFF_DEVICE:
            return {
                ...state,
                devices: toggleStatus(state.devices, action.id)
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                page: action.payload
            }

        // case UPDATE_DEVICE:
        //     return {
        //         ...state, 
        //         devices: 
        //     } 

        case REMOVE_DEVICE:
            return {
                ...state,
                devices: findAndDelete(state.devices, action.id)
            }

        default:
            return state;
    }
}