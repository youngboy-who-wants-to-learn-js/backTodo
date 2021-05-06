import { Moment } from 'moment';
import { Todo, IdsToUpdate, IUser } from '../interfaces/index';

export interface IBodyAddTodo {
    text: string;
}
export type BodyDeleteCompleted = Array<number>;

export interface UpdateTodoBody {
    text?: string;
    completed?: boolean;
}

export interface IFilterPayload {
    status?: string;
    period?: string | null;
    dateRangeFrom?: Moment | Date | string | null;
    dateRangeTo?: Moment | Date | string | null;
    activeFilter?: string;
}

interface TemplateReturn {
    status: number;
    message?: string;
}

export interface DeleteTodoReturn extends TemplateReturn {
    data: {
        id: string;
    };
}

export interface FilterTodoReturn extends TemplateReturn {
    data: Todo[];
}

export interface DeleteCompletedReturn extends TemplateReturn {
    data: BodyDeleteCompleted;
}

interface IAssignRoleReturn extends TemplateReturn {
    data: {
        id: number;
        role: number;
    };
}

interface IStatusReturn extends TemplateReturn {
    data: {
        id: number;
        status: number;
    };
}

interface IGetUsersReturn extends TemplateReturn {
    data: IUser[];
}

export type CallPrivateAPIReturn =
    | Todo
    | DeleteCompletedReturn
    | DeleteTodoReturn
    | FilterTodoReturn
    | IdsToUpdate
    | IAssignRoleReturn
    | IStatusReturn
    | IGetUsersReturn;

type RequestMethods = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export interface IConfig {
    url: string;
    options: {
        method: RequestMethods;
        headers: {
            Authorization?: string;
            'Content-Type'?: string;
            socketId?: null | string | undefined;
        };
        body?: string;
    };
}
