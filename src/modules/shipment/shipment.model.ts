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
    },
    shipmentDescription: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'Pending',
    },
    createdBy: {
      type: String,
      required: true,
      ref: 'User',
      index: true,
    }
  },
  { timestamps: true }
);

export const Shipment = model<ShipmentDocument>('Shipment', shipmentSchema);
