import { call, fork, put, takeEvery } from 'redux-saga/effects';
import authApi from '../../../common/api/auth/auth';
import refreshTokenApi from '../../../common/api/auth/refreshToken';
import { IAuthApiUserTokens } from '../../../common/api/auth/types';
import socket from '../../../common/api/socket';
import { saveToken, saveUserStorage } from '../../../common/utils/tokens';
import {
    authFailed,
    authSuccessful,
    logOutUser,
    registrationSuccess,
    setSockedId,
    setUser,
} from '../../actions/authActions/actionCreators';
import {
    LOGIN_REQUEST,
    LOGOUT_REQUEST,
    REFRESH_TOKEN,
    REGISTRATION_REQUEST,
} from '../../actions/authActions/actionTypes';
import { IRegistrationAction, IRegistrationRes, ILoginAction } from '../types';

function* registrationSaga(action: IRegistrationAction): Generator {
    try {
        const res = yield call(authApi, 'register', action.payload);
        const typedRes = res as IRegistrationRes;
        if (typedRes.status === 200) {
            yield put(registrationSuccess(typedRes));
        } else {
            // @ts-ignore
            yield put(authFailed(typedRes));
        }
    } catch (e) {
        console.log('signUpSaga', e);
    }
}

function* registrationSagaWathcer() {
    yield takeEvery(REGISTRATION_REQUEST, registrationSaga);
}

function* loginSaga(action: ILoginAction): Generator {
    console.log(action);
    try {
        // @ts-ignore
        const res = yield call(authApi, 'login', action.payload);
        const typedRes = res as IAuthApiUserTokens;
        if (typedRes.status === 200) {
            saveUserStorage(typedRes.data);
            saveToken(typedRes.tokens);
            socket.emit('login', { userId: typedRes.data.id, socketId: socket.id });
            yield put(setSockedId(socket.id));
            yield put(authSuccessful(typedRes));
        } else {
            yield put(authFailed(typedRes));
        }
    } catch (e) {
        console.log('signInSaga', e);
    }
}

function* loginSagaWathcer() {
    yield takeEvery(LOGIN_REQUEST, loginSaga);
}

function* refreshTokenSaga(): Generator {
    try {
        const res = yield call(refreshTokenApi);
        const typedRes = res as IAuthApiUserTokens;
        if (typedRes.status === 200) {
            saveUserStorage(typedRes.data);
            saveToken(typedRes.tokens);
            yield put(setUser(typedRes.data));
        }
    } catch (e) {
        console.log('refreshTokenSaga', e);
    }
}

function* refreshTokenSagaWathcer() {
    yield takeEvery(REFRESH_TOKEN, refreshTokenSaga);
}

function* logoutSaga(): Generator {
    try {
        yield put(setSockedId(null));
        yield put(logOutUser());
    } catch (e) {
        console.log('logoutSaga', e);
    }
}

function* logoutSagaWathcer() {
    yield takeEvery(LOGOUT_REQUEST, logoutSaga);
}

export default function* userRootSaga(): Generator {
    yield fork(registrationSagaWathcer);
    yield fork(loginSagaWathcer);
    yield fork(refreshTokenSagaWathcer);
    yield fork(logoutSagaWathcer);
}
