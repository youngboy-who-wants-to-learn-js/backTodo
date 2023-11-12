import callPrivateAPI from '../callPrivateAPI';
import { CallPrivateAPIReturn, UpdateTodoBody } from '../types';

const updateTodoAPI = async (id: number, body: UpdateTodoBody): Promise<CallPrivateAPIReturn> =>
    callPrivateAPI({
        url: `/todos/${id}`,
        options: {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        },
    });

export default updateTodoAPI;
