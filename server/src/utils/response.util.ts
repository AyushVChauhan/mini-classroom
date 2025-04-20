import { Response } from 'express';

/**
 * Bad Request
 */
export function err400(res: Response, message?: string) {
    res.status(400).json({ success: false, message: message ?? 'Bad Request' });
}

/**
 * Unauthorized
 */
export function err401(res: Response, message?: string) {
    res.status(401).json({ success: false, message: message ?? 'Unauthorized' });
}

/**
 * Ok Response
 */
export function ok200(res: Response, data?: any) {
    res.status(200).json({ success: true, data });
}
