import { AnyAction } from 'redux';
import { Todos } from '../../common/interfaces';
import {
    ADD_TODO,
    DELETE_COMPLETED,
    DELETE_TODO,
    SET_TODOS,
    TOGGLE_ALL,
    TOGGLE_TODO,
    UPDATE_TODO,
} from '../actions/todosActions/actionTypes';

export interface ITodosReducer {
    todos: Todos;
}

const initialState: ITodosReducer = {
    todos: [],
};

function todosReducer(state: ITodosReducer = initialState, action: AnyAction): ITodosReducer {
    switch (action.type) {
        case SET_TODOS:
            return {
                ...state,
                todos: action.payload,
            };
        case ADD_TODO:
            console.log('call add todo');
            return {
                ...state,
                todos: [...state.todos, action.payload],
            };
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.payload),
            };
        case TOGGLE_TODO:
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo,
                ),
            };

        case TOGGLE_ALL: {
            const { ids, value } = action.payload;
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    ids.includes(todo.id) ? { ...todo, completed: value } : todo,
                ),
            };
        }
        case DELETE_COMPLETED:
            return {
                ...state,
                todos: state.todos.filter((t) => action.payload.indexOf(t.id) === -1),
            };
        case UPDATE_TODO: {
            const { id, body } = action.payload;
            return {
                ...state,
                todos: state.todos.map((todo) => (todo.id === id ? { ...todo, ...body } : todo)),
            };
        }
        default:
            return state;
    }
}

export default todosReducer;
