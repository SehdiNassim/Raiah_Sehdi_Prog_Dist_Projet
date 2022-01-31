import { all } from 'redux-saga/effects'
import user from './User/sagas'

export default function* rootSaga() {
    yield all([user()])
}