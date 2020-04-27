import { takeEvery, call, put } from "redux-saga/effects";
import { ADD_SAGA_DEVICE } from "../../constants/deviceActions";
import { Oven } from "../reducers/deviceReducer";
import { fetchData } from "./fetchDevices";
import { setDevices } from "../actions/deviceActions/deviceActions";
import { PostOven } from "../../api/api";

// export const addNewOven = (device: PostOven): Promise<Oven> => {
//     return devicesAPI.postOven(device);
// }

const fetchNewOven = async (device: PostOven) => await fetch('http://localhost:3001/api/v1/homes/1/devices', {
    method: "POST",
    body: JSON.stringify(device)
});
//////////////// Add new device (Oven) //////////////
function* workAddDevice(device: PostOven) {
    try {
        yield console.log(device.name);
        yield call(fetchNewOven, device);
        const newData = yield call(fetchData);
        yield put(setDevices(newData));
    } catch {
        console.log("again.....");
    }
}

export function* watchAddDevice() {
    yield takeEvery(ADD_SAGA_DEVICE, workAddDevice)
}