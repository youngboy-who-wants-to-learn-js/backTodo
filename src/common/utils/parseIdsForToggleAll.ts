import { IdsToUpdate, Todo, Todos } from '../interfaces';

const parseIdsForToggleAll = (array: Todos): IdsToUpdate => {
    const todosLength = array.length;
    const completedTodos = array.filter((t) => t.completed).length;
    switch (true) {
        case completedTodos === todosLength:
            return {
                ids: array.map((t) => t.id),
                value: false,
            };
        case completedTodos === 0:
            return {
                ids: array.map((t) => t.id),
                value: true,
            };
        default:
            return {
                ids: array.reduce(
                    (a: Array<number>, t: Todo): Array<number> =>
                        !t.completed ? a.concat(t.id) : a,
                    [],
                ),
                value: true,
            };
    }
};

export default parseIdsForToggleAll;
