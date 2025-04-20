import mongoose, { Connection, Model, Schema } from 'mongoose';
import env from './env.util';
import logger from './logger.util';

export const tenantConnections: { [key: string]: Connection } = {};

export async function connectMainDb() {
    await mongoose.connect(env.DB_URI, {});
    logger.info('MAIN DB CONNECTED');
}

export async function createTenantConnection(
    tenantId: string,
    connectionString: string
): Promise<Connection> {
    if (tenantConnections[tenantId]) return tenantConnections[tenantId];

    const newConnection = await mongoose.createConnection(connectionString).asPromise();
    tenantConnections[tenantId] = newConnection;
    logger.info(`Tenant ${tenantId} DB CONNECTED`);
    return newConnection;
}

export function getTenantConnection(tenantId: string): Connection | undefined {
    return tenantConnections[tenantId];
}

export function defineOrRetrieveModel<T>(
    modelName: string,
    schema: Schema<T>
): (db: Connection) => Model<T> {
    return (db: Connection) => {
        return db.models[modelName] || db.model<T>(modelName, schema);
    };
}
