import React, { ReactElement } from 'react';
import TodoList from './TodoList';

const TodoMain = (): ReactElement => (
    <section className="main">
        <TodoList />
    </section>
);

export default TodoMain;
