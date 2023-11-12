import { Button, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { loginSaga } from '../../redux/actions/authActions/actionCreators';

const LoginForm = (): ReactElement => {
    const dispatch = useDispatch();

    const validationSchema = yup.object({
        userName: yup.string().required('User Name is required'),
        password: yup
            .string()
            .min(8, 'Password must contain at least 8 characters')
            .required('Enter your password'),
    });

    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
        },
        validationSchema,
        onSubmit: (values) => {
            dispatch(loginSaga(values));
            formik.resetForm();
        },
    });

    return (
        <form
            className="registration-form"
            onSubmit={formik.handleSubmit}
            noValidate
            autoComplete="off"
        >
            <TextField
                type="text"
                error={formik.touched.userName && !!formik.errors.userName}
                required
                name="userName"
                id="userName"
                label="User Name"
                placeholder="Enter your user name"
                className="registration-form__item"
                value={formik.values.userName}
                onChange={formik.handleChange}
                helperText={
                    formik.touched.userName && formik.errors.userName ? formik.errors.userName : ''
                }
            />
            <TextField
                type="password"
                error={formik.touched.password && !!formik.errors.password}
                required
                name="password"
                id="password"
                label="Password"
                placeholder="Enter your user password"
                className="registration-form__item"
                value={formik.values.password}
                onChange={formik.handleChange}
                helperText={
                    formik.touched.password && !!formik.errors.password
                        ? formik.errors.password
                        : ''
                }
            />
            <div className="registration-form__submit-btn">
                <Button variant="outlined" color="primary" type="submit" size="large">
                    Login
                </Button>
            </div>
        </form>
    );
};

export default LoginForm;
