import axios from 'axios'
import { Oven, RobotHoover } from "../redux/reducers/deviceReducer";

const instance = axios.create({
    baseURL: 'http://localhost:3001/api/v1/homes/1/devices'
})

export interface Temp {
    min: number,
    max: number,
    current: number,
    step: number
}

export interface PostOven {
    category: string,
    name: string,
    image: string,
    status: boolean,
    temp: Temp,
    modes: string[],
    currentMode: string
}

export interface PostRobot {
    category: string,
    name: string,
    image: string,
    status: boolean,
    modes: string[],
    currentMode: string
}

export const devicesAPI = {

    serverDevices(page: number): Promise<Array<Oven | RobotHoover>> {
        return instance.get<Array<Oven | RobotHoover>>(`?page=${page}`).then(response => response.data)
    },

    postOven(oven: PostOven): Promise<Oven> {
        return instance.post<Oven>('', oven).then(response => response.data)
    },

    postRobot(robot: PostRobot): Promise<RobotHoover> {
        return instance.post<RobotHoover>('', robot).then(response => response.data)
    },

    deleteDevice(id: number): Promise<void> {
        return instance.delete(`${id}`).then(response => response.data)
    },

    filter(page: number, type: string): Promise<Array<Oven | RobotHoover>> {
        return instance.get<Array<Oven | RobotHoover>>(`?page=${page}${type}&perPage=4`).then(response => response.data)
    },

    search(subname: string): Promise<Array<Oven | RobotHoover>> {
        return instance.get<Array<Oven | RobotHoover>>(`?subname=${subname}`).then(response => response.data)
    },

    updateOven(oven: PostOven, id: number): Promise<Oven> {
        return instance.put<Oven>(`${id}`, oven).then(response => response.data)
    },

    updateRobotHoover(robot: PostRobot, id: number): Promise<RobotHoover> {
        return instance.put<RobotHoover>(`${id}`, robot).then(response => response.data)
    }
}