import { IFullUser } from '../../common/interfaces';

export interface IAllUsersReq {
    status: number;
    data: IFullUser[];
}

export interface IRolePayload {
    role: number;
    id: number;
}

export interface IStatusPayload {
    status: number;
    id: number;
}

export interface IAssignRoleAction {
    type: string;
    payload: IRolePayload;
}

export interface IUpdateRole {
    status: number;
    data: IRolePayload;
}

export interface IStatusAction {
    type: string;
    payload: IStatusPayload;
}

export interface IStatusRole {
    status: string;
    data: IStatusPayload;
}

export interface IRegistrationAction {
    type: string;
    payload: {
        userName: string;
        password: string;
        email: string;
    };
}

export interface IRegistrationRes {
    message: string;
    status: number;
}

export interface ILoginAction {
    type: string;
    payload: {
        password: string;
        userName: string;
    };
}
