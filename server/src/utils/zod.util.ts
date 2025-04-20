import { isValidObjectId } from 'mongoose';
import { z } from 'zod';

export const objectIdSchema = z
    .string()
    .min(1)
    .refine((val) => isValidObjectId(val));
