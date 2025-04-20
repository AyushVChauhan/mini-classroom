import pino from 'pino';
import env from './env.util';

const logger = pino({ level: env.LOG_LEVEL });

export default logger;
