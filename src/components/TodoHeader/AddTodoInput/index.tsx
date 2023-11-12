import { Input } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoSaga } from '../../../redux/actions/todosActions/actionCreators';

const AddTodoInput = (): ReactElement => {
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const handlerChange = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setValue(target.value);
    };

    const handlerKeyUp = async (e: React.KeyboardEvent) => {
        e.preventDefault();
        if (e.keyCode === 13 && value) {
            try {
                dispatch(addTodoSaga(value));
                setValue('');
            } catch (err) {
                console.log('handlerKeyUp', err);
            }
        }
    };

    return (
        <Input
            className="header__new-todo"
            placeholder="Add todos"
            type="text"
            name="new-todo"
            id="new-todo"
            value={value}
            onChange={handlerChange}
            onKeyUp={handlerKeyUp}
        />
    );
};

export default AddTodoInput;
