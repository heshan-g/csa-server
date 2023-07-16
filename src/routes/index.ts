import { Router } from 'express';
import userRoutes from '../modules/user/user.routes';

const router = Router();

router.use('/health-check', (_, res) => res.send('Server is healthy'));

router.use('/user', userRoutes);

router.use('*', (_, res) => res.status(404).send('404 Not found'));

export default router;

