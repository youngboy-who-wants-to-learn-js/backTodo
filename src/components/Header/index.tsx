import { Button } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { USER_ROLE_ADMIN } from '../../common/enums/role';
import { logoutRequest } from '../../redux/actions/authActions/actionCreators';
import { AppStateType } from '../../redux/reducers/rootReducers';

const Header = (): ReactElement => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state: AppStateType) => state.auth.user);
    const { userName } = useSelector((state: AppStateType) => state.auth.user);
    const handlerClick = () => {
        dispatch(logoutRequest());
        history.push('/login');
    };

    return (
        <header className="login-page__header">
            <div className="login-header">
                {user?.role === USER_ROLE_ADMIN && (
                    <div className="login-header__link">
                        <Link className="login-header__link" to="/user-list">
                            User List
                        </Link>
                    </div>
                )}
                <div className="login-header__name">{userName}</div>
                <div className="login-header__signout">
                    <Button onClick={handlerClick} variant="contained" color="primary">
                        Sign Out
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
