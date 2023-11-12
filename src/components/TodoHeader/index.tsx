import React, { ReactElement } from 'react';
import AddTodoInput from './AddTodoInput';
import ToggleAllTodo from './ToggleAllTodo';

const TodoHeader = (): ReactElement => (
    <header className="header">
        <h1 className="header__title">TODO</h1>
        <ToggleAllTodo />
        <AddTodoInput />
    </header>
);

export default TodoHeader;
