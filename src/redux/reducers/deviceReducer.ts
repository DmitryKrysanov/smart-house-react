import { deviceActions } from './../actions/deviceActions/deviceActions';
import { ADD_DEVICE, 
    REMOVE_ALL_DEVICES,
    TURN_OFF_ALL_DEVICES,
    TURN_ON_OFF_DEVICE, 
    DECREASE,
    INCREASE,
    SET_MODE,
    REMOVE_DEVICE
} from '../../constants/deviceActions';

export interface DevicesState {
    devices: Array<Oven | RobotHoover>;
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
}

export interface RobotHoover extends Device {
    modes: string[]
}

export const offAllDevices = (devices: Array<Oven | RobotHoover>) => {
    return devices.map((device: any) => {
        return {
            ...device,
        status: false
        }
    })
}

// export const updateObjectInArray = (devices: Array<Oven | RobotHoover>, deviceId: number, objPropName: string, newObjProps: number | string | boolean) => {
//     return devices.map(device => {
//         if (device.id === deviceId) {
//             return {
//                 ...device,
//                 [objPropName]: newObjProps
//             }
//         }
//         return device;
//     })
// }

export const toggleStatus = (devices: Array<Oven | RobotHoover>, deviceId: number) => {
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
    devices: []
}

export const deviceReducer = (state = initialState, action: deviceActions): DevicesState => {
    switch(action.type) {
        case ADD_DEVICE:
            return { ...state, devices: [...state.devices, action.payload] };

        case REMOVE_ALL_DEVICES:
            return state = initialState;

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

        case DECREASE:
            return state

        case INCREASE:
            return state

        case SET_MODE:
            return state

        case REMOVE_DEVICE:
            return state
        
        default:
            return state;
    }
}