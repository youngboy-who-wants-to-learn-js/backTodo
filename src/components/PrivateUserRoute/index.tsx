import React, { ReactElement } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { USER_ROLE_ADMIN } from '../../common/enums/role';
import { IPrivateRoute } from '../../common/interfaces';
import { getUserStorage } from '../../common/utils/tokens';

const PrivateUserRoute = ({ children, exact, path }: IPrivateRoute): ReactElement => {
    const { role } = getUserStorage();
    const isAllowed = role === USER_ROLE_ADMIN;
    return (
        <Route
            exact={exact}
            path={path}
            render={({ location }) =>
                isAllowed ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateUserRoute;
