import { AnyAction } from 'redux';
import { IFullUser } from '../../common/interfaces';
import { ASSIGN_ROLE, SET_STATUS, SET_USERS } from '../actions/usersActions/actionTypes';

export interface IUsersReducer {
    users: IFullUser[];
}

const initialState = {
    users: [],
} as IUsersReducer;

function usersReducer(state: IUsersReducer = initialState, action: AnyAction): IUsersReducer {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.payload,
            };
        case ASSIGN_ROLE: {
            const { id, role } = action.payload;
            return {
                ...state,
                users: state.users.map((user) => (user.id === id ? { ...user, role } : user)),
            };
        }
        case SET_STATUS: {
            const { id: userId, status } = action.payload;
            return {
                ...state,
                users: state.users.map((user) => (user.id === userId ? { ...user, status } : user)),
            };
        }
        default:
            return state;
    }
}

export default usersReducer;
