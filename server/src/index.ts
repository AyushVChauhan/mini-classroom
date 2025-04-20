import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import env from './utils/env.util';
import logger from './utils/logger.util';
import { connectMainDb } from './utils/db.util';
import studentRoutes from './routes/student.route';
import teacherRoutes from './routes/teacher.route';
import commonRoutes from './routes/common.route';
import { tenantMiddleware } from './middlewares/tenant.middleware';
import { errorHandler } from './utils/middleware.util';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(tenantMiddleware);

app.use('/student', studentRoutes);
app.use('/teacher', teacherRoutes);
app.use('/', commonRoutes);

app.use(errorHandler);

app.listen(env.PORT, async function () {
    logger.info('http://localhost:' + env.PORT);
    await connectMainDb();
});
