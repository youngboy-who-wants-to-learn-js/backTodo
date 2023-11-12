import { Todo, Todos } from '../interfaces';

const getCompletedIds = (arr: Todos): Array<number> =>
    arr.reduce(
        (acc: Array<number>, item: Todo) => (item.completed ? acc.concat(item.id) : acc),
        [],
    );

export default getCompletedIds;
