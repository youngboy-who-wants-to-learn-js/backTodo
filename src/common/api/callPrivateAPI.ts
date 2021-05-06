import store from '../../redux/store';
import { getToken, saveToken } from '../utils/tokens';
import refreshToken from './auth/refreshToken';
import { CallPrivateAPIReturn, IConfig } from './types';

const callPrivateAPI = async (config: IConfig): Promise<CallPrivateAPIReturn> => {
    const { accessToken } = getToken();
    const {
        auth: { socketId },
    } = store.getState();
    const newConfig: IConfig = { ...config };
    newConfig.options.headers.Authorization = `Bearer ${accessToken}`;
    newConfig.options.headers.socketId = socketId;
    const res = await fetch(`http://localhost:3001${config.url}`, newConfig.options);
    if (res.status === 405) {
        const resTokens = await refreshToken();
        saveToken(resTokens.tokens);
        const data = await callPrivateAPI(config);
        return data;
    }
    const data = await res.json();
    return data;
};

export default callPrivateAPI;
