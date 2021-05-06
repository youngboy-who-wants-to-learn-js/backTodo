import { Button, TextField } from '@material-ui/core';
import { Field, Form, Formik, FieldProps } from 'formik';
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import validationSchemaRegistration from '../../common/validationScnhemas';
import { registrationSaga } from '../../redux/actions/authActions/actionCreators';

const RegistrationForm = (): ReactElement => {
    const dispatch = useDispatch();
    return (
        <Formik
            initialValues={{
                userName: '',
                email: '',
                password: '',
                phone: '',
                address: '',
                age: '',
            }}
            validationSchema={validationSchemaRegistration}
            onSubmit={(values, { resetForm }) => {
                dispatch(registrationSaga(values));
                resetForm();
            }}
        >
            <Form className="registration-form">
                <Field className="registration-form__item" name="userName">
                    {({ field, meta }: FieldProps) => (
                        <TextField
                            {...field}
                            type="text"
                            label="User Name"
                            placeholder="Enter your user name"
                            className="registration-form__item"
                            error={meta.touched && !!meta.error}
                            helperText={meta.touched && meta.error ? meta.error : ''}
                        />
                    )}
                </Field>
                <Field className="registration-form__item" name="email">
                    {({ field, meta }: FieldProps) => (
                        <TextField
                            {...field}
                            type="text"
                            label="Email"
                            placeholder="Enter your user email"
                            className="registration-form__item"
                            error={meta.touched && !!meta.error}
                            helperText={meta.touched && meta.error ? meta.error : ''}
                        />
                    )}
                </Field>
                <Field className="registration-form__item" name="password">
                    {({ field, meta }: FieldProps) => (
                        <TextField
                            {...field}
                            type="text"
                            label="Password"
                            placeholder="Enter your user password"
                            className="registration-form__item"
                            error={meta.touched && !!meta.error}
                            helperText={meta.touched && meta.error ? meta.error : ''}
                        />
                    )}
                </Field>
                <Field className="registration-form__item" name="phone">
                    {({ field, meta }: FieldProps) => (
                        <TextField
                            {...field}
                            type="text"
                            label="Phone number"
                            placeholder="Enter your phone number"
                            className="registration-form__item"
                            error={meta.touched && !!meta.error}
                            helperText={meta.touched && meta.error ? meta.error : ''}
                        />
                    )}
                </Field>
                <Field className="registration-form__item" name="age">
                    {({ field, meta }: FieldProps) => (
                        <TextField
                            {...field}
                            type="text"
                            label="Age"
                            placeholder="Enter your age"
                            className="registration-form__item"
                            error={meta.touched && !!meta.error}
                            helperText={meta.touched && meta.error ? meta.error : ''}
                        />
                    )}
                </Field>
                <Field className="registration-form__item" name="address">
                    {({ field, meta }: FieldProps) => (
                        <TextField
                            {...field}
                            type="text"
                            label="Address"
                            placeholder="Enter your address"
                            className="registration-form__item"
                            error={meta.touched && !!meta.error}
                            helperText={meta.touched && meta.error ? meta.error : ''}
                        />
                    )}
                </Field>
                <div className="registration-form__submit-btn">
                    <Button variant="outlined" color="primary" type="submit" size="large">
                        Send
                    </Button>
                </div>
            </Form>
        </Formik>
    );
};

export default RegistrationForm;
