import { Router } from 'express';
import Role from '../constants/role';
import { authMiddleware } from '../middlewares/auth.middleware';
import { asyncRouteHandler } from '../utils/middleware.util';
import { getUser } from '../controllers/common.controller';

const router = Router();

router.use(authMiddleware(Role.TEACHER));
router.get('/user', asyncRouteHandler(getUser));

export default router;
