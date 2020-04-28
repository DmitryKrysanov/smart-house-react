import { takeEvery, call, put } from "redux-saga/effects";
import { devicesAPI } from "../../api/api";
import { FILTER_DEVICES } from "../../constants/deviceActions";
import { FilterDevicesAction, setDevices, setTotalItems } from "../actions/deviceActions/deviceActions";
import { Oven, RobotHoover } from "../reducers/deviceReducer";

export const filterDevices = (page: number, type: string): Promise<Array<Oven | RobotHoover>> => {
    return devicesAPI.filter(page, type);
}

function* workFilterDevices(action: FilterDevicesAction) {
    try {
        const filterData = yield call(filterDevices, action.payload.page, action.payload.type);
        yield put(setDevices(filterData.data));
        yield put(setTotalItems(filterData.totalItems));
    } catch (error) {
        console.log(error);
    }
}

export function* watchFilterDevices() {
    yield takeEvery(FILTER_DEVICES, workFilterDevices)
}