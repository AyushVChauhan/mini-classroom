import { ApiResponse } from '../../../types/api';

export type RegisterRequest = {
    role: string;
    name: string;
    email: string;
    password: string;
};

export type RegisterResponse = ApiResponse<void>;
