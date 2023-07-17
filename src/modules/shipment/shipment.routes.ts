import { Router } from 'express';
import { createShipment, getShipment, getShipments } from './shipment.controller';
import { createShipmentRequestSchema } from './shipment.types';
import { authenticate, validateRequest } from '../../middleware';

const router = Router({ mergeParams: false });

router
  .route('/')
  .get(authenticate, getShipments)
  .post(
    authenticate,
    validateRequest(createShipmentRequestSchema),
    createShipment
  );

router.route('/:shipmentId').get(authenticate, getShipment);

export default router;

