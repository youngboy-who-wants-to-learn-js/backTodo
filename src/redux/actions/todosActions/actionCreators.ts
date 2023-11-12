import { Moment } from 'moment';
import { IActionOnlyType, Todo, Todos } from '../../../common/interfaces';
import {
    ADD_SAGA,
    ADD_TODO,
    DELETE_COMPLETED,
    DELETE_COMPLETED_SAGA,
    DELETE_SAGA,
    DELETE_TODO,
    FILTER_SAGA,
    SET_FILTER,
    SET_PERIOD,
    SET_TODOS,
    TOGGLE_ALL,
    TOGGLE_ALL_SAGA,
    TOGGLE_TODO,
    UPDATE_SAGA,
    UPDATE_TODO,
} from './actionTypes';

interface IActionString extends IActionOnlyType {
    payload: string;
}

interface IActionNumber extends IActionOnlyType {
    payload: number;
}

interface ISetTodos extends IActionOnlyType {
    payload: Todos;
}

interface IAddNewTodo extends IActionOnlyType {
    payload: Todo;
}

interface IUpdateBody {
    text?: string;
    completed?: boolean;
}
interface IUpdateTodo extends IActionOnlyType {
    payload: {
        id: number;
        body: {
            text?: string;
            completed?: boolean;
        };
    };
}

export interface IToggleAllPayload {
    ids: number[];
    value: boolean;
}

interface IToggleAll extends IActionOnlyType {
    payload: IToggleAllPayload;
}

interface IDeleteCompltd extends IActionOnlyType {
    payload: Array<number>;
}

// interface IFilterPayload {
//     status?: string;
//     period?: string | null;
// }

// interface IFilter extends IActionOnlyType {
//     payload: IFilterPayload;
// }

interface ISetFilterPayload {
    status?: string;
    period?: string | null;
    dateRangeFrom?: Moment | Date | string | null;
    dateRangeTo?: Moment | Date | string | null;
    activeFilter?: string;
}

interface ISetFilter extends IActionOnlyType {
    payload: ISetFilterPayload;
}

export const addNewTodo = (todo: Todo): IAddNewTodo => ({
    type: ADD_TODO,
    payload: todo,
});

export const deleteTodo = (id: number): IActionNumber => ({
    type: DELETE_TODO,
    payload: id,
});

export const toggleTodo = (id: number): IActionNumber => ({
    type: TOGGLE_TODO,
    payload: id,
});

export const toggleAll = (idsForUpdate: IToggleAllPayload): IToggleAll => ({
    type: TOGGLE_ALL,
    payload: idsForUpdate,
});

export const deleteCompleted = (arrOfIds: Array<number>): IDeleteCompltd => ({
    type: DELETE_COMPLETED,
    payload: arrOfIds,
});

export const updateTodo = (id: number, body: IUpdateBody): IUpdateTodo => ({
    type: UPDATE_TODO,
    payload: {
        id,
        body,
    },
});

export const setFilter = (filtersPayload: ISetFilterPayload): ISetFilter => ({
    type: SET_FILTER,
    payload: filtersPayload,
});

export const setPeriod = (period: string | null): IActionString => ({
    type: SET_PERIOD,
    payload: period,
});

export const setTodos = (todos: Todos): ISetTodos => ({
    type: SET_TODOS,
    payload: todos,
});

export const deleteTodoSaga = (id: number): IActionNumber => ({
    type: DELETE_SAGA,
    payload: id,
});

export const addTodoSaga = (text: string): IActionString => ({
    type: ADD_SAGA,
    payload: text,
});

// export const filterTodoSaga = (filterPayload: IFilterPayload): IFilter => ({
//     type: FILTER_SAGA,
//     payload: filterPayload,
// });

export const filterTodoSaga = (): IActionOnlyType => ({
    type: FILTER_SAGA,
});

export const updateTodoSaga = (id: number, body: IUpdateBody): IUpdateTodo => ({
    type: UPDATE_SAGA,
    payload: {
        id,
        body,
    },
});

export const deleteCompletedSaga = (): IActionOnlyType => ({
    type: DELETE_COMPLETED_SAGA,
});

export const toggleAllSaga = (): IActionOnlyType => ({
    type: TOGGLE_ALL_SAGA,
});
