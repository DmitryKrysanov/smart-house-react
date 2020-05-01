import { all } from 'redux-saga/effects'
import { watchFetchDevices } from './fetchDevices'
import { watchAddOven, watchAddRobot } from './addDevice'
import { watchFilterDevices } from './filterDevices'
import { watchUpdateOven, watchUpdateRobot } from './updateDevices'
import { watchRemoveDevice } from './removeDevice'

export default function* rootSaga() {
  yield all([
    watchFetchDevices(),
    watchAddOven(),
    watchAddRobot(),
    watchFilterDevices(),
    watchUpdateOven(),
    watchUpdateRobot(),
    watchRemoveDevice()
  ])
}