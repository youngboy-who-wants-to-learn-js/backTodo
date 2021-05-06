import { push } from 'connected-react-router';
import { call, fork, put, select, takeEvery } from 'redux-saga/effects';
import assignRoleAPI from '../../../common/api/usersAPI/assignRoleAPI';
import getUsersAPI from '../../../common/api/usersAPI/getUsersAPI';
import setStatusAPI from '../../../common/api/usersAPI/setStatusAPI';
import { USER_ROLE_USER } from '../../../common/enums/role';
import { USER_STATUS_INACTIVE } from '../../../common/enums/status';
import { IUser } from '../../../common/interfaces';
import { logoutRequest, refreshToken } from '../../actions/authActions/actionCreators';
import {
    changeRoleUser,
    changeStatusUser,
    setUsers,
} from '../../actions/usersActions/actionCreators';
import {
    ASSIGN_ROLE_REQUEST,
    BLOCK_USER,
    CHANGE_ROLE_REQUEST,
    REQUEST_USERS,
    SET_STATUS_REQUEST,
} from '../../actions/usersActions/actionTypes';
import { IAllUsersReq, IAssignRoleAction, IStatusAction, IStatusRole, IUpdateRole } from '../types';

function* getAllUsersSaga(): Generator {
    try {
        const req = yield call(getUsersAPI);
        const typedReq = req as IAllUsersReq;
        yield put(setUsers(typedReq.data));
    } catch (e) {
        console.log('getAllUsersSaga', e);
    }
}

function* getAllUsersSagaWathcer() {
    yield takeEvery(REQUEST_USERS, getAllUsersSaga);
}

function* assignRoleSaga(action: IAssignRoleAction): Generator {
    const { role, id } = action.payload;
    try {
        const updatedRole = yield call(assignRoleAPI, role, id);
        const typedUpdatedRole = updatedRole as IUpdateRole;
        yield put(changeRoleUser(typedUpdatedRole.data));
    } catch (e) {
        console.log('assignRoleSaga', e);
    }
}

function* assignRoleSagaWathcer() {
    yield takeEvery(ASSIGN_ROLE_REQUEST, assignRoleSaga);
}

function* setStatusSaga(action: IStatusAction): Generator {
    const { status, id } = action.payload;
    try {
        const updatedStatus = yield call(setStatusAPI, status, id);
        const typedUpdatedStatus = updatedStatus as IStatusRole;
        yield put(changeStatusUser(typedUpdatedStatus.data));
    } catch (e) {
        console.log('setStatusSaga', e);
    }
}

function* setStatusSagaWathcer() {
    yield takeEvery(SET_STATUS_REQUEST, setStatusSaga);
}

function* blockUserSaga(action: IStatusAction): Generator {
    console.log('block user', action);
    const { status, id } = action.payload;
    const user: IUser = yield select((state) => state.auth.user);
    try {
        if (user.id === id && status === USER_STATUS_INACTIVE) {
            yield put(logoutRequest());
            yield put(push('/login'));
        } else {
            yield put(changeStatusUser(action.payload));
        }
    } catch (e) {
        console.log('blockUserSaga', e);
    }
}

function* blockUserSagaWathcer() {
    yield takeEvery(BLOCK_USER, blockUserSaga);
}

function* changeRoleSaga(action: IAssignRoleAction): Generator {
    const { role, id } = action.payload;
    try {
        const user: IUser = yield select((state) => state.auth.user);
        if (user.id === id) {
            yield put(refreshToken());
            if (role === USER_ROLE_USER) {
                yield put(push('/'));
            }
        } else {
            yield put(changeRoleUser(action.payload));
        }
    } catch (e) {
        console.log('changeRoleSaga', e);
    }
}

function* changeRoleSagaWathcer() {
    yield takeEvery(CHANGE_ROLE_REQUEST, changeRoleSaga);
}

export default function* usersRootSaga(): Generator {
    yield fork(getAllUsersSagaWathcer);
    yield fork(assignRoleSagaWathcer);
    yield fork(setStatusSagaWathcer);
    yield fork(blockUserSagaWathcer);
    yield fork(changeRoleSagaWathcer);
}
