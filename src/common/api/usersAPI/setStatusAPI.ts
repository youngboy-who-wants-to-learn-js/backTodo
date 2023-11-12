import callPrivateAPI from '../callPrivateAPI';
import { CallPrivateAPIReturn } from '../types';

const setStatusAPI = async (status: number, id: number): Promise<CallPrivateAPIReturn> =>
    callPrivateAPI({
        url: `/users/set-status/${status}/${id}`,
        options: {
            method: 'PATCH',
            headers: {},
        },
    });

export default setStatusAPI;
