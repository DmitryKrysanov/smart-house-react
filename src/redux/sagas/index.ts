import { all } from 'redux-saga/effects'
import { watchFetchDevices } from './fetchDevices'
import { watchAddDevice } from './addDevice'

export default function* rootSaga() {
  yield all([
    watchFetchDevices(),
    watchAddDevice()
  ])
}