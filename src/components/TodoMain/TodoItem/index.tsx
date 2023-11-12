import React, { useState, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodoSaga, updateTodoSaga } from '../../../redux/actions/todosActions/actionCreators';

interface ITodoItem {
    id: number;
    text: string;
    completed: boolean;
}

const TodoItem = ({ id, text, completed }: ITodoItem): ReactElement => {
    const [isEdit, setIsEdit] = useState(false);
    const [value, setValue] = useState(text);

    const dispatch = useDispatch();

    const handlerDelete = () => dispatch(deleteTodoSaga(id));

    const handlerToggle = () => dispatch(updateTodoSaga(id, { completed: !completed }));

    const handlerDblClick = () => setIsEdit(true);

    const handlerChange = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setValue(target.value);
    };

    const handlerKeyUp = (e: React.KeyboardEvent) => {
        if (e.keyCode === 13 && value) {
            dispatch(updateTodoSaga(id, { text: value }));
            setIsEdit(false);
        }
    };

    return (
        <li
            onDoubleClick={handlerDblClick}
            // @ts-ignore
            id={id}
            className={`todo-list__item ${isEdit ? 'todo-list__item_edit' : ''}`}
        >
            <input
                data-remove="toggle"
                className="todo-list__item__checkbox"
                type="checkbox"
                onClick={handlerToggle}
                checked={completed}
            />
            <div
                data-edit="text"
                className={`todo-list__item__text ${
                    completed ? 'todo-list__item__text-finished' : ''
                }
        `}
            >
                {text}
            </div>
            <input
                data-edit="update"
                className="todo-list__item__update"
                type="text"
                value={value}
                onChange={handlerChange}
                onKeyUp={handlerKeyUp}
            />
            <div onClick={handlerDelete} aria-hidden="true" className="todo-list__item__dlt-btn" />
        </li>
    );
};

export default TodoItem;
