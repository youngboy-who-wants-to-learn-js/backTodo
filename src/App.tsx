import { ConnectedRouter } from 'connected-react-router';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import './Appnull.css';
import PrivateRoute from './components/PrivateRoute';
import PrivateUserRoute from './components/PrivateUserRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TodoPage from './pages/TodoPage';
import UserListPage from './pages/UserListPage';
import { setUser } from './redux/actions/authActions/actionCreators';
import { history } from './redux/store';

function App(): ReactElement {
    const dispatch = useDispatch();
    useEffect(() => {
        // @ts-ignore
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            console.log(user);
            dispatch(setUser(user));
        }
    }, [dispatch]);

    return (
        <ConnectedRouter history={history}>
            <Switch>
                <PrivateRoute exact path="/">
                    <TodoPage />
                </PrivateRoute>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/register">
                    <RegisterPage />
                </Route>
                <PrivateUserRoute path="/user-list">
                    <UserListPage />
                </PrivateUserRoute>
            </Switch>
        </ConnectedRouter>
    );
}

export default App;
