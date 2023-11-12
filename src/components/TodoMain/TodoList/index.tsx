import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { getFilter, getAllTodos } from '../../../redux/selectors';
import filterTodos from '../../../common/utils/filterTodos';
import TodoItem from '../TodoItem';

const TodoList = (): ReactElement => {
    const filter = useSelector(getFilter);
    const todos = useSelector(getAllTodos);
    const filteredTodos = filterTodos(todos, filter.status);

    // useEffect(() => {

    // }, [])
    // console.log(filter);
    return (
        <ul className="todo-list">
            {filteredTodos.map((todo) => (
                <TodoItem key={todo.id} id={todo.id} text={todo.text} completed={todo.completed} />
            ))}
        </ul>
    );
};

export default TodoList;
