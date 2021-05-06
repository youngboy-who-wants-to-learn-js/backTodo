import { Todos } from '../interfaces';

const filterTodos = (arr: Todos, activeFilter: string): Todos => {
    switch (activeFilter) {
        case 'all':
            return arr;
        case 'active':
            return arr.filter((t) => !t.completed);
        case 'completed':
            return arr.filter((t) => t.completed);
        default:
            return arr;
    }
};

export default filterTodos;
