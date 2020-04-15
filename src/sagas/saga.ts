import { takeEvery, call, put } from "redux-saga/effects";
import { FETCH_DEVICES } from "../constants/deviceActions";
import { setDevices } from "../redux/actions/deviceActions/deviceActions";

const fetchData = () => {
    return fetch('http://localhost:3001/api/v1/homes/1/devices?page=1&perPage=10')
        .then(response => response.json())
        .then(json => json.data)
}
// eslint-disable-next-line require-yield
function* workFetchDevices() {
    const data = yield call(fetchData);

    yield put(setDevices(data));
}

export function* watchFetchDevices() {
    yield takeEvery(FETCH_DEVICES, workFetchDevices);
}