import { AppStateType } from './reducers/rootReducers';
import { Todos } from '../common/interfaces';
import { IFilterReducer } from './reducers/filterReducer';

export const getFilter = (state: AppStateType): IFilterReducer => state.filter;

export const getAllTodos = (state: AppStateType): Todos => state.todos.todos;
