import axios from 'axios'
import { Device, Oven, RobotHoover } from "../redux/reducers/deviceReducer";

const instance = axios.create({
    baseURL: 'https://my-json-server.typicode.com/SvetaShmalko/json-server/devices'
})

 export const devicesAPI = {

    serverDevices() {
        return instance.get<Array<Oven | RobotHoover>>('').then(response =>  response.data)
    }
    
}
