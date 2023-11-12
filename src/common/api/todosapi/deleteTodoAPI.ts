import callPrivateAPI from '../callPrivateAPI';
import { CallPrivateAPIReturn } from '../types';

const deleteTodoAPI = async (id: number): Promise<CallPrivateAPIReturn> =>
    callPrivateAPI({
        url: `/todos/${id}`,
        options: {
            method: 'DELETE',
            headers: {},
        },
    });

export default deleteTodoAPI;
