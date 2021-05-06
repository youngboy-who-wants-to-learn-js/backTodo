import { AnyAction } from 'redux';
import { IUser } from '../../common/interfaces';
import {
    AUTH_FAILED,
    AUTH_SUCCESSFUL,
    LOG_OUT,
    REGISTRATION_SUCCESS,
    RESET_MSG,
    SET_SOCKED_ID,
    SET_USER,
} from '../actions/authActions/actionTypes';

export interface IAuthReducer {
    user: IUser;
    isAuth: boolean;
    errorCode: string | number | null;
    msg: string | null;
    socketId: null | string | undefined;
}

const initialState: IAuthReducer = {
    user: {},
    isAuth: false,
    errorCode: null,
    msg: null,
    socketId: null,
};

function authReducer(state: IAuthReducer = initialState, action: AnyAction): IAuthReducer {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                isAuth: true,
                user: action.payload,
            };
        case AUTH_SUCCESSFUL: {
            console.log('success', action);
            const { data, status } = action.payload;
            return {
                ...state,
                isAuth: true,
                user: data,
                errorCode: status,
            };
        }
        case REGISTRATION_SUCCESS:
            return {
                ...state,
                errorCode: action.payload.status,
                msg: action.payload.message,
            };
        case LOG_OUT:
            localStorage.removeItem('user');
            localStorage.removeItem('tokenData');
            return {
                ...state,
                user: {},
                isAuth: false,
                errorCode: null,
            };
        case AUTH_FAILED: {
            console.log('failed', action);
            const { status: statusCode, message } = action.payload;
            return {
                ...state,
                errorCode: statusCode,
                msg: message,
            };
        }
        case RESET_MSG:
            return {
                ...state,
                errorCode: null,
                msg: null,
            };
        case SET_SOCKED_ID:
            return {
                ...state,
                socketId: action.payload,
            };
        default:
            return state;
    }
}

export default authReducer;
