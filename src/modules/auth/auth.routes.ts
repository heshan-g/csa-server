import { Router } from 'express';
import { login, refreshToken } from './auth.controller';
import { validateRequest } from '../../middleware';
import { loginRequestSchema } from './auth.types';

const router = Router({ mergeParams: false });

router.post('/login', validateRequest(loginRequestSchema), login);

router.post('/refresh-token', refreshToken);

export default router;

