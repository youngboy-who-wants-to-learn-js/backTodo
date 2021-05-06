import callPrivateAPI from '../callPrivateAPI';
import { CallPrivateAPIReturn } from '../types';

const assignRoleAPI = async (role: number | string, id: number): Promise<CallPrivateAPIReturn> =>
    callPrivateAPI({
        url: `/users/assign-role/${role}/${id}`,
        options: {
            method: 'PATCH',
            headers: {},
        },
    });

export default assignRoleAPI;
