interface IObjectKeys {
    [key: string]: string | number | boolean | undefined;
}

interface IValidObject extends IObjectKeys {
    userName: string;
    password: string;
    email?: string;
}

export interface IValidationError extends IObjectKeys {
    userName: boolean;
    email?: boolean;
    password: boolean;
}

interface IValidationOptions {
    checkPasswordLength: boolean;
}

export const isValid = (obj: IValidObject): boolean => Object.values(obj).every((item) => !!item);

export const validationValue = (
    errObj: IValidationError,
    valueObj: IValidObject,
    options: IValidationOptions,
): IValidationError => {
    const errorObject: IValidationError = { ...errObj };
    Object.keys(valueObj).forEach((item) => {
        if (valueObj[item]) {
            errorObject[item] = false;
        } else {
            errorObject[item] = true;
        }

        if (options.checkPasswordLength && item === 'password' && valueObj[item].length <= 8) {
            errorObject[item] = true;
        }
    });
    return errorObject;
};
