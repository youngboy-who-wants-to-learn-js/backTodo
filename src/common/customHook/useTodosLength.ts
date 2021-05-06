import { useSelector } from 'react-redux';
import { getAllTodos } from '../../redux/selectors';
import { Todo } from '../interfaces/index';

interface IUseTodosLength {
    completedTodos: number;
    todosLength: number;
    isAllTodosCompleted: boolean;
    activeTodos: number;
}

const useTodosLength = (): IUseTodosLength => {
    const todos = useSelector(getAllTodos);

    const completedTodos = todos.filter((t: Todo) => t.completed).length;
    const todosLength = todos.length;
    const isAllTodosCompleted = completedTodos === todosLength;
    const activeTodos = todosLength - completedTodos;

    return {
        completedTodos,
        todosLength,
        isAllTodosCompleted,
        activeTodos,
    };
};

export default useTodosLength;
