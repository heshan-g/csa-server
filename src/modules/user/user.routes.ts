import { Router } from 'express';
import { createUser } from './user.controller';
import { createUserRequestSchema } from './user.types';
import { authenticate, validateRequest } from '../../middleware';

const router = Router({ mergeParams: false });

router
  .route('/')
  .post(authenticate, validateRequest(createUserRequestSchema), createUser);

export default router;

