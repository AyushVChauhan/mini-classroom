import mongoose, { InferSchemaType } from 'mongoose';

const tenantSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        connectionString: { type: String, required: true, trim: true },
    },
    { timestamps: true }
);

export type TenantType = InferSchemaType<typeof tenantSchema>;
export const Tenant = mongoose.model('Tenant', tenantSchema);

export default tenantSchema;
