import React, { useEffect, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import { resetMsg } from '../../redux/actions/authActions/actionCreators';
import { AppStateType } from '../../redux/reducers/rootReducers';

const LoginPage = (): ReactElement => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { errorCode, msg } = useSelector((state: AppStateType) => state.auth);

    useEffect(() => {
        if (errorCode === 200) {
            history.push('/');
        }
    }, [errorCode, history]);

    const handlerClick = () => {
        dispatch(resetMsg());
        history.push('/register');
    };
    return (
        <section className="todo-app" id="todo-app">
            <div className="login-page">
                <h1 className="registration-page__header">Login</h1>
                <LoginForm />
                <div className="login-footer">
                    No account?{' '}
                    <span onClick={handlerClick} aria-hidden="true">
                        Register
                    </span>
                </div>
                {errorCode && <div className="login-error">{msg}</div>}
            </div>
        </section>
    );
};

export default LoginPage;
