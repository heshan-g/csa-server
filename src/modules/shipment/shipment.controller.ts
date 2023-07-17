import { Request, Response } from 'express';
import * as shipmentService from './shipment.service';
import handleError from '../../utils/handleError';
import { ShipmentType } from './shipment.types';

export const createShipment = async (req: Request, res: Response) => {
  try {
    const newShipment = req.body as ShipmentType;

    const shipmentId = await shipmentService.createShipment(newShipment);

    res.status(201).json({ shipmentId });
  } catch (err) {
    handleError(err, res);
  }
}

