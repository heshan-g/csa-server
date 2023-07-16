import { Router } from 'express';
import { createUser } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { createUserRequestSchema } from './user.types';

const router = Router({ mergeParams: false });

router.route('/').post(validateRequest(createUserRequestSchema), createUser);

export default router;

