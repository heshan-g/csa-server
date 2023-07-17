import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import userRoutes from '../modules/user/user.routes';
import shipmentRoutes from '../modules/shipment/shipment.routes';

const router = Router();

router.use('/health-check', (_, res) => res.send('Server is healthy'));

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/shipment', shipmentRoutes);

router.use('*', (_, res) => res.status(404).send('404 Not found'));

export default router;

