import { takeEvery, call, put } from "redux-saga/effects";
import { FETCH_DEVICES } from "../../constants/deviceActions";
import { setDevices } from "../actions/deviceActions/deviceActions";
import { showLoader, hideLoader } from "../actions/loaderActions/loaderActions";


export const fetchData = () => {
    return fetch('http://localhost:3001/api/v1/homes/1/devices?page=1&perPage=4')
        .then(response => response.json())
        .then(json => json.data)
}
// eslint-disable-next-line require-yield
/////////////// Get all devices ///////////////
function* workFetchDevices() {
    try {
        yield put(showLoader());
        const data = yield call(fetchData);
        yield put(setDevices(data));
        yield put(hideLoader());
    } catch (error) {
        console.log(error);
    }
}

export function* watchFetchDevices() {
    yield takeEvery(FETCH_DEVICES, workFetchDevices);
}

