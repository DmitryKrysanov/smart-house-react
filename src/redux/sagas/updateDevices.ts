import { showAlert, hideAlert } from '../actions/alertActions/alertActions';
import { takeEvery, call, put, delay } from "redux-saga/effects";
import { fetchData } from "./fetchDevices";
import { setDevices, AddSagaOvenAction, AddSagaRobotAction, UpdateRobotAction, UpdateOvenAction } from "../actions/deviceActions/deviceActions";
import { PostOven, PostRobot } from "../../api/api";
import { UPDATE_ROBOT, UPDATE_OVEN } from "../../constants/deviceActions";
import { showLoader, hideLoader } from '../actions/loaderActions/loaderActions';

///////////////// UPDATE ROBOT ///////////////

const fetchUpdateRobot = (device: PostRobot, id: number) => {
    return fetch(`http://localhost:3001/api/v1/homes/1/devices/${id}`, {
        method: "PUT",
        body: JSON.stringify(device),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
};

function* workUpdateRobot(action: UpdateRobotAction) {
    try {
        yield put(showLoader());
        const updRobot = yield call(fetchUpdateRobot, action.payload.device, action.payload.id);
        if (updRobot.status >= 200 && updRobot.status < 300) {
            yield put(showAlert("Device has been updated successfully"));
            yield put(hideLoader());
            yield put(hideAlert());
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

export function* watchUpdateRobot() {
    yield takeEvery(UPDATE_ROBOT, workUpdateRobot)
}

///////////////// UPDATE OVEN ///////////////

const fetchUpdateOven = (device: PostOven, id: number) => {
    return fetch(`http://localhost:3001/api/v1/homes/1/devices/${id}`, {
        method: "PUT",
        body: JSON.stringify(device),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
};

function* workUpdateOven(action: UpdateOvenAction) {
    try {
        yield put(showLoader());
        const updOven = yield call(fetchUpdateOven, action.payload.device, action.payload.id);
        if (updOven.status >= 200 && updOven.status < 300) {
            yield put(showAlert("Device has been updated successfully"));
            yield put(hideLoader());
            yield put(hideAlert());
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

export function* watchUpdateOven() {
    yield takeEvery(UPDATE_OVEN, workUpdateOven)
}