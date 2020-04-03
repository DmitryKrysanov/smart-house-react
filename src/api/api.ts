import { Device } from "../redux/reducers/deviceReducer";

 export const devicesAPI = {

    serverDevices() {
        return async ():Promise<Device[]> => {
            return(
             await fetch("https://my-json-server.typicode.com/SvetaShmalko/json-server/devices")
                .then(resp => {
                    console.log(resp);
                    return resp.json();
                })
            )
        }
    }
}
