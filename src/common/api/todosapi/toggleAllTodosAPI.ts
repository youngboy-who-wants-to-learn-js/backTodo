import callPrivateAPI from '../callPrivateAPI';
import { CallPrivateAPIReturn } from '../types';
import { IdsToUpdate } from '../../interfaces';

const toggleAllTodosAPI = async (idsToUpdate: IdsToUpdate): Promise<CallPrivateAPIReturn> =>
    callPrivateAPI({
        url: '/todos/toggleall',
        options: {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(idsToUpdate),
        },
    });

export default toggleAllTodosAPI;
