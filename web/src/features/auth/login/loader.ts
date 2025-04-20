import { redirect } from 'react-router';
import paths from '../../../config/paths';
import { decodeToken, getToken } from '../../../utils/auth';

export function loginLoader() {
    const token = getToken();
    if (!token) return;

    const payload = decodeToken(token);
    if (!payload) return;

    return redirect(paths[payload.role].dashboard.getHref());
}
