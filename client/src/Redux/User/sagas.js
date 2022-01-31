import { all, takeEvery, put, call } from "redux-saga/effects";
import actions from './actions'
import { persistCurrentUser } from '../../Helpers/jwt';
import { load, Login, getNavbarData, googleAuth } from '../../Services/Auth';
import toast from '../../Helpers/toast';
import { removeCurrentUser } from './../../Helpers/jwt';

export function* LOAD() {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loadUser: true
        }
    })
    try {
        yield call(load)
        yield put({
            type: actions.SET_STATE,
            payload: {
                isLoggedIn: true,
                // ...response.data.user
            }
        })
        const response = yield call(getNavbarData)
        yield put({
            type: actions.SET_STATE,
            payload: {
                loadUser: false,
                loading: false,
                ...response.data.user
            }
        })

    } catch (error) {
        yield put({
            type: actions.SET_STATE,
            payload: {
                loadUser: false,
            }
        })
    }
}

export function* LOGIN({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        }
    })
    try {
        const response = yield call(Login, payload)
        const { accessToken, refreshToken } = response.data
        yield call(persistCurrentUser, { accessToken, refreshToken })
        yield put({
            type: actions.SET_STATE,
            payload: {
                loading: false,
                ...response.data.user
            }
        })
        const response2 = yield call(getNavbarData)
        yield put({
            type: actions.SET_STATE,
            payload: {
                isLoggedIn: true,
                loading: false,
                ...response2.data.user
            }
        })
    } catch (error) {
        toast('error', "Email ou mot de passe incorrect, veuillez réessayer s'il vous plait")
        yield put({
            type: actions.SET_STATE,
            payload: {
                loading: false,
            }
        })
    }
}
export function* GOOGLE_AUTH({ history, token }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loadUser: true,
        }
    })
    try {
        const response = yield call(googleAuth,token)
        const { accessToken, refreshToken } = response.data
        yield call(persistCurrentUser, { accessToken, refreshToken })
        yield put({
            type: actions.SET_STATE,
            payload: {
                ...response.data.user
            }
        })
        const response2 = yield call(getNavbarData)
        yield put({
            type: actions.SET_STATE,
            payload: {
                isLoggedIn: true,
                loadUser: false,
                ...response2.data.user
            }
        })
    } catch (error) {
        yield put({
            type: actions.SET_STATE,
            payload: {
                loadUser: false,
            }
        })
        yield call(history.push,'/auth')
    }
}
export function* LOGOUT() {
    try {
        yield call(removeCurrentUser)
        yield put({
            type: actions.RESET,
        })
    } catch (error) {
        yield put({
            type: actions.RESET,
        })
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.LOAD, LOAD),
        takeEvery(actions.LOGIN, LOGIN),
        takeEvery(actions.GOOGLE_AUTH, GOOGLE_AUTH),
        takeEvery(actions.LOGOUT, LOGOUT),
        LOAD()
    ]);
}