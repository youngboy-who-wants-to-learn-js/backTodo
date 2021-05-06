import React, { useState, useEffect, ReactElement } from 'react';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormControl from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch } from 'react-redux';
import useTodosLength from '../../../common/customHook/useTodosLength';
import { toggleAllSaga } from '../../../redux/actions/todosActions/actionCreators';

const ToggleAllTodo = (): ReactElement => {
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();
    const { isAllTodosCompleted, todosLength } = useTodosLength();

    useEffect(() => {
        const handlerCheckedBtn = () => {
            if (!todosLength) {
                return false;
            }

            return isAllTodosCompleted;
        };

        setChecked(handlerCheckedBtn());
    }, [setChecked, isAllTodosCompleted, todosLength]);

    const handlerToggleAll = () => dispatch(toggleAllSaga());

    return (
        <FormControl
            label=""
            className="toggle"
            control={
                <Checkbox
                    checked={checked}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    name="checkedH"
                    onClick={handlerToggleAll}
                />
            }
        />
    );
};

export default ToggleAllTodo;
