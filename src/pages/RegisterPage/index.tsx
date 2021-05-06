import React, { ReactElement, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RegistrationForm from '../../components/RegistrationForm';
import { resetMsg } from '../../redux/actions/authActions/actionCreators';
import { AppStateType } from '../../redux/reducers/rootReducers';

const RegisterPage = (): ReactElement => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { errorCode, msg } = useSelector((state: AppStateType) => state.auth);

    const handlerClick = useCallback(() => {
        dispatch(resetMsg());
        history.push('/login');
    }, [dispatch, history]);

    useEffect(() => {
        if (errorCode === 200) {
            handlerClick();
        }
    }, [errorCode, history, dispatch, handlerClick]);

    return (
        <section className="todo-app" id="todo-app">
            <div className="registration-page">
                {errorCode !== 200 && <div className="login-error">{msg}</div>}
                <h1 className="registration-page__header">Registration</h1>
                <RegistrationForm />
                <div className="login-footer">
                    Already have an account?{' '}
                    <span onClick={handlerClick} aria-hidden="true">
                        Login
                    </span>
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;
