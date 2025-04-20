import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import Role from '../constants/role';
import { asyncRouteHandler } from '../utils/middleware.util';
import { getUser } from '../controllers/common.controller';

const router = Router();

router.use(authMiddleware(Role.STUDENT));
router.get('/user', asyncRouteHandler(getUser));

export default router;
