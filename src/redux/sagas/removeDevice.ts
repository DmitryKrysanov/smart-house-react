import { REMOVE_DEVICE } from "../../constants/deviceActions";
import { takeEvery, put, delay, call } from "redux-saga/effects";
import { removeDeviceAction, setDevices } from "../actions/deviceActions/deviceActions";
import { showAlert, hideAlert } from "../actions/alertActions/alertActions";
import { showLoader, hideLoader } from "../actions/loaderActions/loaderActions";
import { fetchData } from "./fetchDevices";

const fetchRemoveDevice = (id: number) => {
    return fetch(`http://localhost:3001/api/v1/homes/1/devices/${id}`, {
        method: "DELETE"
    })
};

function* workRemoveDevice(action: removeDeviceAction) {
    try {
        yield put(showLoader());
        const removeDev = yield call(fetchRemoveDevice, action.id);
        if (removeDev.status >= 200 && removeDev.status < 300) {
            yield put(showAlert("Device has been removed"));
            const data = yield call(fetchData);
            yield put(setDevices(data));
            yield put(hideLoader());
            yield delay(3000)
            yield put(hideAlert())
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

export function* watchRemoveDevice() {
    yield takeEvery(REMOVE_DEVICE, workRemoveDevice)
}