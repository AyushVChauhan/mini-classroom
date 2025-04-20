import { ApiResponse } from './../types/api';
import { QueryClient } from '@tanstack/react-query';
import { User } from '../types/api';
import { api } from '../lib/api';
import { decodeToken, getToken, resetToken } from '../utils/auth';
import { redirect } from 'react-router';
import paths from '../config/paths';
import { Role } from '../types/constants';

export async function getUser(): Promise<ApiResponse<User> | null> {
    const token = getToken();
    if (!token) return null;
    const tokenData = decodeToken(token);
    if (!tokenData) return null;
    return await api.get(`/${tokenData.role}/user`, {});
}

export function userLoader(queryClient: QueryClient, role: Role) {
    return async function () {
        const user = await getUser();
        if (!user || !user.success) {
            resetToken();
            return redirect(paths.auth.login.getHref());
        }
        queryClient.setQueryData(['user'], user.data);
        if (user.data.role != role) return redirect(paths[role].dashboard.path);
        return;
    };
}
