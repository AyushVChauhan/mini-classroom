import { useMutation } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import { LoginRequest, LoginResponse } from './type';

function login(data: LoginRequest): Promise<LoginResponse> {
    return api.post<LoginRequest, LoginResponse>('/login', data);
}
export function useLogin(onSuccess: (data: LoginResponse['data']) => void) {
    return useMutation({
        mutationFn: login,
        onSuccess: ({ data }) => {
            localStorage.setItem('token', data.token);
            onSuccess(data);
        },
    });
}
