import axios from 'axios'
import { Device, Oven, RobotHoover } from "../redux/reducers/deviceReducer";

const instance = axios.create({
    // baseURL: 'https://my-json-server.typicode.com/SvetaShmalko/json-server/devices'
    baseURL: 'http://localhost:3001/api/homes/1/devices'
})

interface PostOven {
    type: string,
    name: string,
    image: string,
    status: boolean,
    temp: {},
    modes: string[],
    currentMode: string
}

interface PostRobot {
    type: string,
    name: string,
    image: string,
    status: boolean,
    modes: string[],
    currentMode: string
}

interface Filter {
    type: string
}

interface Search {
    subname: string
}


export const devicesAPI = {

    serverDevices(page: number) {
        return instance.get<Array<Oven | RobotHoover>>(`?page=${page}`).then(response => response.data)
    },

    postOven(oven: PostOven) {
        return instance.post<Oven>('', oven).then(response => response.data)
    },

    postRobot(robot: PostRobot) {
        return instance.post<RobotHoover>('', robot).then(response => response.data)
    },

    deleteDevice(id: number) {
        return instance.delete(`${id}`).then(response => response.data)
    },

    filter(type: string) {
        return instance.get<Array<Oven | RobotHoover>>(`?type=${type}`).then(response => response.data) 
    },

    search(subname: string) {
        return instance.get<Array<Oven | RobotHoover>>(`?subname=${subname}`).then(response => response.data) 
    }

}
