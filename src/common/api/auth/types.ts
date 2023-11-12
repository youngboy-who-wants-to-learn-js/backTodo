export interface IAuthBodyProps {
    email: string;
    password?: string;
    userName: string;
    age?: string;
    phone?: string;
    address?: string;
}

export type IAuthApiUserTokens = {
    data: {
        email: string;
        role: number;
        userName: string;
        id: number | string;
    };
    status: number;
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
};

export type IAuthApiRegister = {
    message: string;
    status: number;
};

export type IAuthApi = IAuthApiUserTokens | IAuthApiRegister;
