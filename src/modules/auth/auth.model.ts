import { model, Schema } from 'mongoose';
import { RefreshTokenDocument } from './auth.types';

const refreshTokenSchema = new Schema<RefreshTokenDocument>(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User',
      index: true,
    },
    refreshToken: {
      type: String,
      required: true,
      index: true,
    },
    expireAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
).index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export const RefreshToken = model<RefreshTokenDocument>(
  'RefreshToken',
  refreshTokenSchema
);
