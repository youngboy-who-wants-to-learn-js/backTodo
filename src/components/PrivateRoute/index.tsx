import React, { ReactElement } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IPrivateRoute } from '../../common/interfaces';
import { getUserStorage } from '../../common/utils/tokens';

const PrivateRoute = ({ children, exact, path }: IPrivateRoute): ReactElement => {
    const user = getUserStorage();
    return (
        <Route
            exact={exact}
            path={path}
            render={({ location }) =>
                user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
