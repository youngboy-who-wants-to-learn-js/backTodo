import { IAuthApi, IAuthBodyProps } from './types';

const authApi = async (url: string, body: IAuthBodyProps): Promise<IAuthApi> => {
    const res = await fetch(`http://localhost:3001/auth/${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
};

export default authApi;
