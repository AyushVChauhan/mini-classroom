import { Request, Response } from 'express';
import { z } from 'zod';
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';

import { getDb, getUserData } from '../utils/middleware.util';
import { User } from '../schemas/user.schema';
import errors from '../utils/error.util';
import env from '../utils/env.util';
import { ok200 } from '../utils/response.util';
import Role from '../constants/role';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});
export async function login(req: Request, res: Response) {
    const { email, password } = loginSchema.parse(req.body);
    const db = getDb(res);

    const user = await User(db).findOne({ email: email });
    if (!user) throw new errors.BAD_REQUEST('Invalid Credentials!');

    if (!(await argon2.verify(user.password, password)))
        throw new errors.BAD_REQUEST('Invalid Credentials!');

    const token = jwt.sign({ _id: user._id, role: user.role }, env.JWT_SECRET);

    ok200(res, { token, role: user.role });
}

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
    name: z.string().trim(),
    role: z.enum([Role.TEACHER, Role.STUDENT]),
});
export async function register(req: Request, res: Response) {
    const { email, password, name, role } = registerSchema.parse(req.body);
    const db = getDb(res);

    try {
        await User(db).create({ email, name, password: await argon2.hash(password), role });
    } catch (e) {
        throw new errors.BAD_REQUEST('Email already exists');
    }

    ok200(res);
}

export async function getUser(_: Request, res: Response) {
    const userData = getUserData(res);
    const db = getDb(res);
    const user = await User(db).findOne({ _id: userData._id }).select('name role email');
    ok200(res, user);
}
