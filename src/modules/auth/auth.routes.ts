import { Router } from 'express';
import { login, logout, refreshToken } from './auth.controller';
import { authenticate, validateRequest } from '../../middleware';
import { loginRequestSchema } from './auth.types';

const router = Router({ mergeParams: false });

router.post('/login', validateRequest(loginRequestSchema), login);

router.post('/refresh-token', refreshToken);

router.post('/logout', authenticate, logout);

export default router;

