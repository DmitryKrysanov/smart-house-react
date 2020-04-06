import axios from 'axios'
import { Device } from "../redux/reducers/deviceReducer";

const instance = axios.create({
    baseURL: 'https://my-json-server.typicode.com/SvetaShmalko/json-server/devices'
})

 export const devicesAPI = {

    serverDevices() {
        return instance.get<Device[]>('').then(response =>  response.data)
    }
}
