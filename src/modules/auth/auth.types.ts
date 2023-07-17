import { Document } from 'mongoose';
import Joi from 'joi';

export interface RefreshTokenDocument extends Document {
  userId: string;
  refreshToken: string;
  expireAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const loginRequestSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

