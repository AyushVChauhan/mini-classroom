import { JwtPayload } from '../types/auth';
import { jwtDecode } from 'jwt-decode';
import { Role } from '../types/constants';

export function setToken(token: string): void {
    localStorage.setItem('token', token);
}

export function getToken(): string | null {
    return localStorage.getItem('token');
}

export function resetToken(): void {
    localStorage.removeItem('token');
}

export function decodeToken(token: string): JwtPayload | null {
    try {
        const payload = jwtDecode<JwtPayload>(token);
        if (!isValidRole(payload.role)) {
            resetToken();
            return null;
        }
        return payload;
    } catch {
        return null;
    }
}

export function isValidRole(role: string): role is Role {
    return role === Role.STUDENT || role === Role.TEACHER;
}
