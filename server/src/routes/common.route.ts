import { Router } from 'express';
import { asyncRouteHandler } from '../utils/middleware.util';
import { login, register } from '../controllers/common.controller';

const router = Router();

router.post('/login', asyncRouteHandler(login));
router.post('/register', asyncRouteHandler(register));

export default router;
