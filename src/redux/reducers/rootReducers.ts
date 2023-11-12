import { connectRouter } from 'connected-react-router';
import { combineReducers, Reducer } from 'redux';
import authReducer, { IAuthReducer } from './authReducer';
import filterReducer, { IFilterReducer } from './filterReducer';
import todosReducer, { ITodosReducer } from './todosReducer';
import usersReducer, { IUsersReducer } from './usersReducer';

const createRootReducer = (history: any): Reducer =>
    combineReducers({
        router: connectRouter(history),
        todos: todosReducer,
        filter: filterReducer,
        auth: authReducer,
        users: usersReducer,
    });

// type RootReducerType = typeof createRootReducer;
// export type AppStateType = ReturnType<RootReducerType>;

export interface AppStateType {
    todos: ITodosReducer;
    filter: IFilterReducer;
    auth: IAuthReducer;
    users: IUsersReducer;
}

export default createRootReducer;
