import { takeEvery, call, put } from "redux-saga/effects";
import { Oven } from "../reducers/deviceReducer";
import { fetchData } from "./fetchDevices";
import { setDevices } from "../actions/deviceActions/deviceActions";
import { PostOven } from "../../api/api";
import { ADD_SAGA_OVEN } from "../../constants/deviceActions";


// export const addNewOven = (device: PostOven): Promise<Oven> => {
//     return devicesAPI.postOven(device);
// }

const fetchNewOven = (device: PostOven) => fetch('http://localhost:3001/api/v1/homes/1/devices', {
    method: "POST",
    body: JSON.stringify(device)
});
//////////////// Add new device (Oven) //////////////
function* workAddDevice(device: PostOven) {
    try {
        //  yield console.log(device);
        yield call(fetchNewOven, device);
        const data = yield call(fetchData);
        yield put(setDevices(data));
    } catch {
        console.log('FUUUUCK');
    }
}

export function* watchAddDevice() {
    yield takeEvery(ADD_SAGA_OVEN, workAddDevice)
}