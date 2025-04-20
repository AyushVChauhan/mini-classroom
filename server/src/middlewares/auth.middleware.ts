import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';

import Role from '../constants/role';
import { err401 } from '../utils/response.util';
import env from '../utils/env.util';
import errors from '../utils/error.util';
import JwtPayload from '../types/jwt-payload.type';

export function authMiddleware(role: Role) {
    return function (req: Request, res: Response, next: NextFunction) {
        try {
            const { data: token } = z
                .string()
                .jwt()
                .safeParse(req.headers.authorization?.split(' ')[1]);
            if (!token) return err401(res, 'Token is missing');

            const userData = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
            if (userData.role != role) return err401(res, errors.UNAUTHORIZED.defaultMessage);
            res.locals.userData = userData;
            next();
        } catch (e) {
            return err401(res, errors.UNAUTHORIZED.defaultMessage);
        }
    };
}
