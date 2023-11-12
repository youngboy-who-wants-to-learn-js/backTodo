import callPrivateAPI from '../callPrivateAPI';
import { BodyDeleteCompleted, CallPrivateAPIReturn } from '../types';

const delCompletedAPI = async (arr: BodyDeleteCompleted): Promise<CallPrivateAPIReturn> =>
    callPrivateAPI({
        url: '/todos/deletecompleted',
        options: {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(arr),
        },
    });

export default delCompletedAPI;
