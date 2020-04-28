import { takeEvery, call, put } from "redux-saga/effects";
import { Oven } from "../reducers/deviceReducer";
import { fetchData } from "./fetchDevices";
import { setDevices, AddSagaOvenAction, AddSagaRobotAction } from "../actions/deviceActions/deviceActions";
import { PostOven, devicesAPI, PostRobot } from "../../api/api";
import { ADD_SAGA_OVEN, ADD_SAGA_ROBOT } from "../../constants/deviceActions";


// export const addNewOven = (device: PostOven): Promise<Oven> => {
//     return devicesAPI.postOven(device);
// }

const fetchNewOven = (device: PostOven) => fetch('http://localhost:3001/api/v1/homes/1/devices', {
    method: "POST",
    body: JSON.stringify(device),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }

}).then(res => console.log(res));
//////////////// Add new device (Oven) //////////////
function* workAddOven(action: AddSagaOvenAction) {
    try {
        yield console.log(action.payload);
        const newOven = yield call(fetchNewOven, action.payload);
        yield console.log(newOven);
        const data = yield call(fetchData);
        yield put(setDevices(data));
    } catch (error) {
        console.log(error);
    }
}

export function* watchAddOven() {
    yield takeEvery(ADD_SAGA_OVEN, workAddOven)
}



const fetchNewRobot = (device: PostRobot) => fetch('http://localhost:3001/api/v1/homes/1/devices', {
    method: "POST",
    body: JSON.stringify(device),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }

}).then(res => console.log(res));
//////////////// Add new device (Robot) //////////////
function* workAddRobot(action: AddSagaRobotAction) {
    try {
        yield console.log(action.payload);
        const newOven = yield call(fetchNewRobot, action.payload);
        yield console.log(newOven);
        const data = yield call(fetchData);
        yield put(setDevices(data));
    } catch (error) {
        console.log(error);
    }
}

export function* watchAddRobot() {
    yield takeEvery(ADD_SAGA_ROBOT, workAddRobot)
}

