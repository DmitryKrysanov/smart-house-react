import { takeEvery, call, put } from "redux-saga/effects";
import { devicesAPI } from "../../api/api";
import { FILTER_DEVICES } from "../../constants/deviceActions";

export const filterDevices = (page: number, type: string) => {
    return devicesAPI.filter(page, type);
}

function* workFilterDevices() {

}

export function* watchFilterDevices() {
    yield takeEvery(FILTER_DEVICES, workFilterDevices)
}