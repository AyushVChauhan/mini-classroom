import { Response } from 'express';
import { err400, err401 } from './response.util';

export type ResponseError = {
    message: string;
    responseFunction: (res: Response, message: string) => void;
    errorCode: number;
};

class BadRequest extends Error {
    responseFunction = err400;
    static defaultMessage = 'Bad Request!';
    static errorCode = 400;
    constructor(message?: string) {
        super(message ?? BadRequest.defaultMessage);
    }
}

class Unauthorized extends Error {
    responseFunction = err401;
    static defaultMessage = 'Unauthorized!';
    static errorCode = 401;
    constructor(message?: string) {
        super(message ?? Unauthorized.defaultMessage);
    }
}

const errors = Object.freeze({ BAD_REQUEST: BadRequest, UNAUTHORIZED: Unauthorized });

export default errors;
