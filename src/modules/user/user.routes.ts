import { Router } from 'express';
import { createUser } from './user.controller';

const router = Router({ mergeParams: false });

router.route('/').post(createUser);

export default router;

