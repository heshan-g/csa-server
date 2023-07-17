import { Shipment } from './shipment.model';
import { ShipmentType } from './shipment.types';

export const createShipment = async (shipment: ShipmentType) => {
  const newShipment = new Shipment(shipment);
  const createdShipment = await newShipment.save();

  return createdShipment.toObject()._id;
}

