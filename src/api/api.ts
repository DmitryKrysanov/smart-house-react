import axios from 'axios'
import { Oven, RobotHoover } from "../redux/reducers/deviceReducer";

const instance = axios.create({
    baseURL: 'http://localhost:3001/api/homes/1/devices'
})

export interface PostOven {
    type: string,
    name: string,
    image: string,
    status: boolean,
    temp: {},
    modes: string[],
    currentMode: string
}

export interface PostRobot {
    type: string,
    name: string,
    image: string,
    status: boolean,
    modes: string[],
    currentMode: string
}

export const devicesAPI = {

    serverDevices(page: number): Promise<Array<Oven | RobotHoover>>  {
        return instance.get<Array<Oven | RobotHoover>>(`?page=${page}&perPage=4`).then(response => response.data)
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

    filter(type: string): Promise<Array<Oven | RobotHoover>>  {
        return instance.get<Array<Oven | RobotHoover>>(`?type=${type}&perPage=4`).then(response => response.data) 
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
