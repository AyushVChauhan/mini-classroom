import { Response, Request } from 'express';
import { NextFunction } from 'express-serve-static-core';
import mongoose from 'mongoose';
import { ResponseError } from './error.util';
import JwtPayload from '../types/jwt-payload.type';

export function getDb(res: Response) {
    return res.locals.db as mongoose.Connection;
}

export function getTenantId(res: Response) {
    return res.locals.tenantId as string;
}

export function getUserData(res: Response) {
    return res.locals.userData as JwtPayload;
}

export function asyncRouteHandler(handler: (req: Request, res: Response) => Promise<void>) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            await handler(req, res);
        } catch (e) {
            next(e);
        }
    };
}

export function errorHandler(err: ResponseError, _: Request, res: Response, __: NextFunction) {
    err.responseFunction(res, err.message);
}
