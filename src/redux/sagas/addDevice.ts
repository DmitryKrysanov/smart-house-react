import { showAlert, hideAlert } from './../actions/alertActions/alertActions';
import { takeEvery, call, put } from "redux-saga/effects";
import { fetchData } from "./fetchDevices";
import { setDevices, AddSagaOvenAction, AddSagaRobotAction } from "../actions/deviceActions/deviceActions";
import { PostOven, PostRobot } from "../../api/api";
import { ADD_SAGA_OVEN, ADD_SAGA_ROBOT } from "../../constants/deviceActions";
import { showLoader, hideLoader } from '../actions/loaderActions/loaderActions';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

const fetchNewOven = (device: PostOven) => {
    return fetch('http://localhost:3001/api/v1/homes/1/devices', {
        method: "POST",
        body: JSON.stringify(device),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
};
//////////////// Add new device (Oven) //////////////
function* workAddOven(action: AddSagaOvenAction) {
    try {
        yield put(showLoader());
        const newOven = yield call(fetchNewOven, action.payload);
        if (newOven.status >= 200 && newOven.status < 300) {
            const data = yield call(fetchData);
            yield put(setDevices(data));
            yield put(hideLoader());
        } else {
            yield put(showAlert("Something went wrong"))
            yield put(hideLoader());
            yield delay(3000)
            yield put(hideAlert())
        }
    } catch (error) {
        yield put(showAlert("Server is not responding."))
        yield delay(3000)
        yield put(hideAlert())
    }
}

export function* watchAddOven() {
    yield takeEvery(ADD_SAGA_OVEN, workAddOven)
}

const fetchNewRobot = (device: PostRobot) => {
    return fetch('http://localhost:3001/api/v1/homes/1/devices', {
        method: "POST",
        body: JSON.stringify(device),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
};
//////////////// Add new device (Robot) //////////////
function* workAddRobot(action: AddSagaRobotAction) {
    try {
        yield put(showLoader());
        const newRobot = yield call(fetchNewRobot, action.payload);
        if (newRobot.status >= 200 && newRobot.status < 300) {
            const data = yield call(fetchData);
            yield put(setDevices(data));
            yield put(hideLoader());
        } else {
            yield put(showAlert("Something went wrong"))
            yield put(hideLoader());
            yield delay(3000)
            yield put(hideAlert())
        }
    } catch (error) {
        yield put(showAlert("Server is not responding."))
        yield delay(3000)
        yield put(hideAlert())
    }
}

export function* watchAddRobot() {
    yield takeEvery(ADD_SAGA_ROBOT, workAddRobot)
}

