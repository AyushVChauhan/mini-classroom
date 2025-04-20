import { useMutation } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import { RegisterRequest, RegisterResponse } from './type';

function register(data: RegisterRequest): Promise<RegisterResponse> {
    return api.post<RegisterRequest, RegisterResponse>('/register', data);
}
export function useRegister(onSuccess: () => void) {
    return useMutation({
        mutationFn: register,
        onSuccess,
    });
}
