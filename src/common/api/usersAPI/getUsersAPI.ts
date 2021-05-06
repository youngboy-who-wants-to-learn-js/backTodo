import callPrivateAPI from '../callPrivateAPI';
import { CallPrivateAPIReturn } from '../types';

const getUsersAPI = async (): Promise<CallPrivateAPIReturn> =>
    callPrivateAPI({
        url: '/users',
        options: {
            method: 'GET',
            headers: {},
        },
    });

export default getUsersAPI;
