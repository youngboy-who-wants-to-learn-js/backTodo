import { IAuthApiUserTokens } from '../../../common/api/auth/types';
import { IActionOnlyType, IUser } from '../../../common/interfaces';
import { IRegistrationAction, IRegistrationRes } from '../../saga/types';
import {
    AUTH_FAILED,
    AUTH_SUCCESSFUL,
    LOGIN_REQUEST,
    LOGOUT_REQUEST,
    LOG_OUT,
    REFRESH_TOKEN,
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    RESET_MSG,
    SET_ERROR,
    SET_SOCKED_ID,
    SET_USER,
} from './actionTypes';

interface ISetUser {
    type: string;
    payload: IUser;
}

interface ISetError extends IActionOnlyType {
    payload: number;
}

interface ISetSockedId extends IActionOnlyType {
    payload: string;
}

interface ILoginSaga extends IActionOnlyType {
    payload: IUser;
}

interface IRegistrationSuccess extends IActionOnlyType {
    payload: IRegistrationRes;
}

interface IRegisterSagaPayload {
    userName: string;
    password: string;
    email: string;
    age: string;
    address: string;
    phone: string;
}

interface IAuthFailed extends IActionOnlyType {
    payload: IAuthApiUserTokens;
}

interface IAuthSucces extends IActionOnlyType {
    payload: IAuthApiUserTokens;
}

export const setUser = (userData: IUser): ISetUser => ({
    type: SET_USER,
    payload: userData,
});

export const logOutUser = (): IActionOnlyType => ({
    type: LOG_OUT,
});

export const setError = (errorCode: number): ISetError => ({
    type: SET_ERROR,
    payload: errorCode,
});

export const authSuccessful = (userData: IAuthApiUserTokens): IAuthSucces => ({
    type: AUTH_SUCCESSFUL,
    payload: userData,
});

export const registrationSaga = (userData: IRegisterSagaPayload): IRegistrationAction => ({
    type: REGISTRATION_REQUEST,
    payload: userData,
});

export const registrationSuccess = (payload: IRegistrationRes): IRegistrationSuccess => ({
    type: REGISTRATION_SUCCESS,
    payload,
});

export const loginSaga = (userData: IUser): ILoginSaga => ({
    type: LOGIN_REQUEST,
    payload: userData,
});

export const authFailed = (data: IAuthApiUserTokens): IAuthFailed => ({
    type: AUTH_FAILED,
    payload: data,
});

export const resetMsg = (): IActionOnlyType => ({
    type: RESET_MSG,
});

export const refreshToken = (): IActionOnlyType => ({
    type: REFRESH_TOKEN,
});

export const setSockedId = (payload: string): ISetSockedId => ({
    type: SET_SOCKED_ID,
    payload,
});

export const logoutRequest = (): IActionOnlyType => ({
    type: LOGOUT_REQUEST,
});
