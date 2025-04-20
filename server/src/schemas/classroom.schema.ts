import mongoose, { InferSchemaType } from 'mongoose';
import { defineOrRetrieveModel } from '../utils/db.util';
import userSchema from './user.schema';

const classroomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    uniqueCode: { type: String, required: true },
    students: [
        {
            studentId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
            joinedAt: { type: Date, required: true },
        },
    ],
    studentRequests: [
        {
            studentId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
            requestedtAt: { type: Date, required: true },
            requestStatus: { type: String, enum: ['pending', 'rejected', 'accepted'] },
            statusUpdatedAt: { type: Date, required: true },
        },
    ],
});

export type ClassroomType = InferSchemaType<typeof classroomSchema>;
export const Classroom = defineOrRetrieveModel<ClassroomType>('Classroom', classroomSchema);

export default userSchema;
