import * as yup from 'yup';

const envSchema = yup.object({
    VITE_BACKEND_URL: yup.string().required(),
    VITE_TENANT_ID: yup.string().length(24).required(),
});
const env = envSchema.validateSync(import.meta.env);

export default env;
