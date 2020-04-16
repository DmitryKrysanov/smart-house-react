import { takeEvery, call, put } from "redux-saga/effects";
import { FETCH_DEVICES } from "../../constants/deviceActions";
import { setDevices } from "../actions/deviceActions/deviceActions";
import { showLoader, hideLoader } from "../actions/loaderActions/loaderActions";

const fetchData = () => {
    return fetch('http://localhost:3001/api/v1/homes/1/devices?page=1&perPage=10')
        .then(response => response.json())
        .then(json => json.data)
}
// eslint-disable-next-line require-yield
function* workFetchDevices() {
    yield put(showLoader());
    const data = yield call(fetchData);
    yield put(setDevices(data));
    yield put(hideLoader());
}

export function* watchFetchDevices() {
    yield takeEvery(FETCH_DEVICES, workFetchDevices);
}