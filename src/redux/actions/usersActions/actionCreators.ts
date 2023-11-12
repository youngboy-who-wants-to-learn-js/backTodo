import { IActionOnlyType, IFullUser } from '../../../common/interfaces';
import { IRolePayload, IStatusAction, IStatusPayload } from '../../saga/types';
import {
    ASSIGN_ROLE,
    ASSIGN_ROLE_REQUEST,
    BLOCK_USER,
    CHANGE_ROLE_REQUEST,
    REQUEST_USERS,
    SET_STATUS,
    SET_STATUS_REQUEST,
    SET_USERS,
} from './actionTypes';

interface ISetUser extends IActionOnlyType {
    payload: IFullUser[];
}

interface IAssignRoleUser extends IActionOnlyType {
    payload: IRolePayload;
}
interface ISetStatusUser extends IActionOnlyType {
    payload: IStatusPayload;
}

export const setUsers = (users: IFullUser[]): ISetUser => ({
    type: SET_USERS,
    payload: users,
});

export const requestUsers = (): IActionOnlyType => ({
    type: REQUEST_USERS,
});

export const assignRoleUser = (role: number, id: number): IAssignRoleUser => ({
    type: ASSIGN_ROLE_REQUEST,
    payload: {
        role,
        id,
    },
});

export const changeRoleUser = (userData: IRolePayload): IAssignRoleUser => ({
    type: ASSIGN_ROLE,
    payload: userData,
});

export const setStatusUser = (status: number, id: number): ISetStatusUser => ({
    type: SET_STATUS_REQUEST,
    payload: {
        status,
        id,
    },
});

export const changeStatusUser = (userData: IStatusPayload): ISetStatusUser => ({
    type: SET_STATUS,
    payload: userData,
});

export const blockUser = (payload: IStatusPayload): IStatusAction => ({
    type: BLOCK_USER,
    payload,
});

export const changeRoleRequest = (payload: IRolePayload): IAssignRoleUser => ({
    type: CHANGE_ROLE_REQUEST,
    payload,
});
