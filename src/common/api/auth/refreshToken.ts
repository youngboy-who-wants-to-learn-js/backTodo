import { getToken } from '../../utils/tokens';
import { IAuthApiUserTokens } from './types';

const refreshTokenApi = async (): Promise<IAuthApiUserTokens> => {
    const { refreshToken } = getToken();
    const res = await fetch('http://localhost:3001/auth/refresh-tokens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
    });
    const data = await res.json();
    return data;
};

export default refreshTokenApi;
