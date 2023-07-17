import { Shipment } from './shipment.model';
import { ShipmentType } from './shipment.types';

export const createShipment = async (shipment: Omit<ShipmentType, 'status'>) => {
  const newShipment = new Shipment({ ...shipment, status: 'Pending' });
  const createdShipment = await newShipment.save();

  return createdShipment.toObject()._id;
}

