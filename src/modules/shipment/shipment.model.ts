import { model, Schema } from 'mongoose';
import { ShipmentDocument } from './shipment.types';

const shipmentSchema = new Schema<ShipmentDocument>(
  {
    senderName: {
      type: String,
      required: true,
    },
    senderAddress: {
      type: String,
      required: true,
    },
    recipientName: {
      type: String,
      required: true,
    },
    recipientAddress: {
      type: String,
      required: true,
      unique: true,
    },
    shipmentDescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Shipment = model<ShipmentDocument>('Shipment', shipmentSchema);
