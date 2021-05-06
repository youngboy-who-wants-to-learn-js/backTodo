import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserTable from '../../components/UserTable';
import { requestUsers } from '../../redux/actions/usersActions/actionCreators';
import { AppStateType } from '../../redux/reducers/rootReducers';

const UserListPage = (): ReactElement => {
    const dispatch = useDispatch();
    const users = useSelector((state: AppStateType) => state.users.users);

    useEffect(() => {
        dispatch(requestUsers());
    }, [dispatch]);

    return (
        <section className="todo-app" id="todo-app">
            <header className="users-header">
                <h1 className="users-header__item">Admin Page</h1>
            </header>
            <div className="users-container">
                <UserTable users={users} />
            </div>
            <footer className="users-footer">
                <Link to="/">return to Todos page</Link>
            </footer>
        </section>
    );
};

export default UserListPage;
