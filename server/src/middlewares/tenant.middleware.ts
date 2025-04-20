import { NextFunction, Request, Response } from 'express';

import { objectIdSchema } from '../utils/zod.util';
import { err401 } from '../utils/response.util';
import { Tenant } from '../schemas/tenant.schema';
import { createTenantConnection, getTenantConnection } from '../utils/db.util';

async function tenantMiddleware(req: Request, res: Response, next: NextFunction) {
    const { success, data: tenantId } = objectIdSchema.safeParse(req.headers['x-tenant-id']);
    if (!success || !tenantId) return err401(res, 'Invalid x-tenant-id!');

    let connection = getTenantConnection(tenantId);
    if (!connection) {
        const tenant = await Tenant.findOne({ _id: tenantId });
        if (!tenant) return err401(res);

        connection = await createTenantConnection(tenantId, tenant.connectionString);
    }

    res.locals.db = connection;
    res.locals.tenantId = tenantId;

    next();
}

export { tenantMiddleware };
