import { all } from 'redux-saga/effects';
import userRootSaga from './authSagas';
import todoRootSaga from './todoSagas';
import usersRootSaga from './usersSagas';
import watchOnEventHandlers from './socketSaga';

export default function* rootSaga(): Generator {
    yield all([todoRootSaga(), userRootSaga(), usersRootSaga(), watchOnEventHandlers()]);
}
