import { Router } from 'express';
import { createShipment } from './shipment.controller';
import { createShipmentRequestSchema } from './shipment.types';
import { authenticate, validateRequest } from '../../middleware';

const router = Router({ mergeParams: false });

router
  .route('/')
  .post(
    authenticate,
    validateRequest(createShipmentRequestSchema),
    createShipment
  );

export default router;

