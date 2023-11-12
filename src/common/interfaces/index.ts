import { ReactNode, ReactNodeArray } from 'react';

export interface Todo {
    UserId: string;
    completed: boolean;
    createdAt: string;
    id: number;
    text: string;
    updatedAt: string;
}

export type Todos = Todo[];

export interface IdsToUpdate {
    ids: Array<number>;
    value: boolean;
}

export interface IToken {
    accessToken: string;
    refreshToken: string;
}

export interface IUser {
    id?: number | string;
    userName?: string;
    email?: string;
    role?: number;
}

export type SocketId = null | string;

export interface IFullUser {
    TokenTokenId: null;
    createdAt: string;
    email: string;
    id: number;
    password: string;
    role: number;
    status: number;
    updatedAt: number;
    userName: number;
    UserContact: {
        createdAt: string;
        updatedAt: number;
        id: number;
        age: string;
        phone: string | number;
        address: string;
    };
}

export interface IActionOnlyType {
    type: string;
}

export interface IPrivateRoute {
    children: ReactNode | ReactNodeArray;
    exact?: boolean;
    path: string;
}
