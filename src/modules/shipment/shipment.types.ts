import { Document } from 'mongoose';
import Joi from 'joi';

export type ShipmentType = {
  senderName: string;
  senderAddress: string;
  recipientName: string;
  recipientAddress: string;
  shipmentDescription: string;
  status: string;
  createdBy: string;
}

export interface ShipmentDocument extends Document, ShipmentType {}

export const createShipmentRequestSchema = Joi.object({
  senderName: Joi.string().required(),
  senderAddress: Joi.string().required(),
  recipientName: Joi.string().required(),
  recipientAddress: Joi.string().required(),
  shipmentDescription: Joi.string().required(),
});

