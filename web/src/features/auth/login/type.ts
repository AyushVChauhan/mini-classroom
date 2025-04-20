import { ApiResponse } from '../../../types/api';
import { Role } from '../../../types/constants';

export type LoginRequest = {
    email: string;
    password: string;
};
export type LoginResponse = ApiResponse<{
    token: string;
    role: Role;
}>;
