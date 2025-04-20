import { Role } from './constants';

export type JwtPayload = {
    role: Role;
    userId: string;
};
