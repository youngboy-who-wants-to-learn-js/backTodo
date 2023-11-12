import { call, fork, put, select, takeEvery } from 'redux-saga/effects';
import addTodoAPI from '../../../common/api/todosapi/addTodoAPI';
import delCompletedAPI from '../../../common/api/todosapi/delCompletedAPI';
import deleteTodoAPI from '../../../common/api/todosapi/deleteTodoAPI';
import toggleAllTodosAPI from '../../../common/api/todosapi/toggleAllTodosAPI';
import filterTodoAPI from '../../../common/api/todosapi/filterTodoAPI';
import updateTodoAPI from '../../../common/api/todosapi/updateTodoAPI';
import { Todo, Todos } from '../../../common/interfaces';
import getCompletedIds from '../../../common/utils/getCompletedIds';
import parseIdsForToggleAll from '../../../common/utils/parseIdsForToggleAll';
import { getFilter } from '../../selectors';
import {
    addNewTodo,
    deleteCompleted,
    deleteTodo,
    IToggleAllPayload,
    setFilter,
    setTodos,
    toggleAll,
    updateTodo,
} from '../../actions/todosActions/actionCreators';
import {
    ADD_SAGA,
    DELETE_COMPLETED_SAGA,
    DELETE_SAGA,
    FILTER_SAGA,
    TOGGLE_ALL_SAGA,
    UPDATE_SAGA,
} from '../../actions/todosActions/actionTypes';

interface IAddTodoAction {
    type: string;
    payload: {
        text: string;
    };
}

interface IDeleteTodoAction {
    type: string;
    payload: number;
}

interface IDeleteTodoReq {
    statusCode: string;
    data: {
        id: string | number;
    };
}

interface IDeleteComplReq {
    data: Array<number>;
    status: number;
}

// interface IFilterAction {
//     payload: {
//         status: string;
//         period: string;
//     };
//     type: string;
// }

interface IFilterReq {
    status: number;
    data: Todos;
}

export interface IUpdateTodoAction {
    type: string;
    payload: {
        id: number;
        body: {
            text?: string;
            completed?: boolean;
        };
    };
}

function* addNewTodoSaga(action: IAddTodoAction): Generator {
    try {
        // @ts-ignore
        const res = yield call(addTodoAPI, { text: action.payload });
        const typedRes = res as Todo;
        yield put(addNewTodo(typedRes));
    } catch (e) {
        console.log('addTodoSaga', e);
    }
}

function* addNewTodoSagaWathcer() {
    yield takeEvery(ADD_SAGA, addNewTodoSaga);
}

function* deleteSaga(action: IDeleteTodoAction): Generator {
    try {
        const result = yield call(deleteTodoAPI, action.payload);
        const typedResult = result as IDeleteTodoReq;
        yield put(deleteTodo(+typedResult.data.id));
    } catch (e) {
        console.log('deleteTodoSaga', e);
    }
}

function* deleteSagaWathcer() {
    yield takeEvery(DELETE_SAGA, deleteSaga);
}

function* deleteCompletedSaga(): Generator {
    try {
        const todos = yield select((state) => state.todos.todos);
        console.log(todos);
        const typedTodos = todos as Todos;
        const arrOfIds = getCompletedIds(typedTodos);
        if (arrOfIds.length > 0) {
            const res = yield call(delCompletedAPI, arrOfIds);
            const typedRes = res as IDeleteComplReq;
            if (typedRes.status === 200) {
                yield put(deleteCompleted(typedRes.data));
            }
        }
    } catch (e) {
        console.log('deleteCompletedSaga', e);
    }
}

function* deleteCompletedSagaWatcher() {
    yield takeEvery(DELETE_COMPLETED_SAGA, deleteCompletedSaga);
}

function* filterSaga(): Generator {
    const filters = yield select(getFilter);
    try {
        // @ts-ignore
        const req = yield call(filterTodoAPI, filters);
        const typedReq = req as IFilterReq;
        if (typedReq.status === 200) {
            yield put(setTodos(typedReq.data));
            yield put(setFilter(filters));
        }
    } catch (e) {
        console.log('filterTodoSaga', e);
    }
}

function* filterSagaWathcer() {
    yield takeEvery(FILTER_SAGA, filterSaga);
}

function* updateTodoSaga(action: IUpdateTodoAction): Generator {
    const { id, body } = action.payload;
    try {
        const result = yield call(updateTodoAPI, id, body);
        const typedResult = result as Todo;
        yield put(updateTodo(typedResult.id, typedResult));
    } catch (e) {
        console.log('updateTodoSaga', e);
    }
}

function* updateSagaWathcer() {
    yield takeEvery(UPDATE_SAGA, updateTodoSaga);
}

function* toggleAllTodosSaga(): Generator {
    try {
        // @ts-ignore
        const todos: Todos = yield select((state) => state.todos.todos);
        const idsToUpdate = parseIdsForToggleAll(todos);
        const result = yield call(toggleAllTodosAPI, idsToUpdate);
        const typedResult = result as IToggleAllPayload;
        yield put(toggleAll(typedResult));
    } catch (e) {
        console.log('toggleAllTodosSaga', e);
    }
}

function* toggleAllTodosSagaWatcher() {
    yield takeEvery(TOGGLE_ALL_SAGA, toggleAllTodosSaga);
}

export default function* todoRootSaga(): Generator {
    yield fork(deleteSagaWathcer);
    yield fork(addNewTodoSagaWathcer);
    yield fork(updateSagaWathcer);
    yield fork(deleteCompletedSagaWatcher);
    yield fork(filterSagaWathcer);
    yield fork(toggleAllTodosSagaWatcher);
}
