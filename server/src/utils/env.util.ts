import dotenv from 'dotenv';
import { z } from 'zod';
dotenv.config();

const envSchema = z.object({
    PORT: z.string().default('3000'),
    JWT_SECRET: z.string().min(1),
    DB_URI: z.string().min(1),
    LOG_LEVEL: z.string().default('silent'),
});
const env = envSchema.parse(process.env);

export default env;
