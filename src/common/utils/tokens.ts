import { IToken, IUser } from '../interfaces';

export const saveToken = (token: IToken): void =>
    localStorage.setItem('tokenData', JSON.stringify(token));

// if (typeof storedPortfolio === 'string') {
//     moonPortfolio = JSON.parse(storedPortfolio);
//   }

export const getToken = (): IToken => {
    const tokenData = localStorage.getItem('tokenData');
    let parsedTokenData;
    if (typeof tokenData === 'string') {
        parsedTokenData = JSON.parse(tokenData);
    }
    return parsedTokenData;
};

export const saveUserStorage = (user: IUser): void =>
    localStorage.setItem('user', JSON.stringify(user));

export const getUserStorage = (): IUser => {
    const userData = localStorage.getItem('user');
    let parsedUserData;
    if (typeof userData === 'string') {
        parsedUserData = JSON.parse(userData);
    }
    return parsedUserData;
};
