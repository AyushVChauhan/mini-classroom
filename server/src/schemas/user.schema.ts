import mongoose, { InferSchemaType } from 'mongoose';
import Role from '../constants/role';
import { defineOrRetrieveModel } from '../utils/db.util';

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        role: { type: String, enum: Role, required: true },
    },
    { timestamps: true }
);

export type UserType = InferSchemaType<typeof userSchema>;
export const User = defineOrRetrieveModel<UserType>('User', userSchema);

export default userSchema;
