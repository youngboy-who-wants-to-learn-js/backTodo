import * as yup from 'yup';

const validationSchemaRegistration = yup.object({
    userName: yup.string().required('User Name is required'),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password must contain at least 8 characters')
        .required('Enter your password'),
    phone: yup
        .string()
        .matches(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/g, 'Incorrect phone number')
        .required('Enter your phone number'),
    age: yup
        .number()
        .positive()
        .integer()
        .min(16, 'Age must be over 16')
        .max(99, 'Age must be less than 99')
        .required('Enter your age'),
    address: yup.string().required('Enter your address'),
});

export default validationSchemaRegistration;
