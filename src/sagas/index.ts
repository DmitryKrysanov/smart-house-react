import { all } from 'redux-saga/effects'
import { watchFetchDevices } from './saga'


export default function* rootSaga() {
  yield all([
    watchFetchDevices(),
  ])
}