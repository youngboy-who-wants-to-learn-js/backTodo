import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleWare from 'redux-saga';
import createRootReducer from './reducers/rootReducers';
import rootSaga from './saga/root-saga';

export const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);
const sagaMiddleWare = createSagaMiddleWare();
const store = createStore(
    createRootReducer(history),
    composeWithDevTools(applyMiddleware(sagaMiddleWare, routeMiddleware)),
);

sagaMiddleWare.run(rootSaga);

export default store;
