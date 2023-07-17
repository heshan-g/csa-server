import { Request, Response } from 'express';
import * as shipmentService from './shipment.service';
import handleError from '../../utils/handleError';
import { ShipmentType } from './shipment.types';

export const createShipment = async (req: Request, res: Response) => {
  try {
    const newShipment = req.body as Omit<ShipmentType, 'status' | 'createdBy'>;

    const shipmentId = await shipmentService.createShipment(
      newShipment,
      req.locals.user.id,
    );

    res.status(201).json({ shipmentId });
  } catch (err) {
    handleError(err, res);
  }
}

export const getShipment = async (req: Request, res: Response) => {
  try {
    const { shipmentId } = req.params;

    const shipment = await shipmentService.getShipmentById(shipmentId);

    res.status(200).json({ shipment });
  } catch (err) {
    handleError(err, res);
  }
}

