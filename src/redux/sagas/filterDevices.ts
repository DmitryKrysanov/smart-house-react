import { takeEvery, call, put } from "redux-saga/effects";
import { FILTER_DEVICES } from "../../constants/deviceActions";
import { FilterDevicesAction, setDevices, setTotalItems } from "../actions/deviceActions/deviceActions";
import { Oven, RobotHoover } from "../reducers/deviceReducer";
import { showLoader, hideLoader } from "../actions/loaderActions/loaderActions";

const filterDevices = (page: number, type: string) => {
    return fetch(`http://localhost:3001/api/v1/homes/1/devices?page=${page}${type}&perPage=4`)
        .then(resp => resp.json())
}

function* workFilterDevices(action: FilterDevicesAction) {
    try {
        yield put(showLoader());
        const filterData = yield call(filterDevices, action.payload.page, action.payload.type);
        yield put(setDevices(filterData.data));
        yield put(setTotalItems(filterData.totalItems));
        yield put(hideLoader());
    } catch (error) {
        console.log(error);
    }
}

export function* watchFilterDevices() {
    yield takeEvery(FILTER_DEVICES, workFilterDevices)
}