import { all } from 'redux-saga/effects'
import { watchFetchDevices } from './fetchDevices'

export default function* rootSaga() {
  yield all([
    watchFetchDevices(),
  ])
}