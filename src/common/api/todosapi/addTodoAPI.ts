import callPrivateAPI from '../callPrivateAPI';
import { CallPrivateAPIReturn, IBodyAddTodo } from '../types';

const addTodoAPI = async (body: IBodyAddTodo): Promise<CallPrivateAPIReturn> =>
    callPrivateAPI({
        url: '/todos',
        options: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        },
    });

export default addTodoAPI;
