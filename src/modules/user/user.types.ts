import { Document } from 'mongoose';

export type UserType = {
  name: string;
  email: string;
  password: string;
}

export interface UserDocument extends Document, UserType {}

