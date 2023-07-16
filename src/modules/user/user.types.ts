import { Document } from 'mongoose';
import Joi from 'joi';

export type UserType = {
  name: string;
  email: string;
  password: string;
}

export interface UserDocument extends Document, UserType {}

export const createUserRequestSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().pattern(
    // Minimum six characters,
    //   at least one upper case and one lower case letter,
    //   one number and one special character
    new RegExp(
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$'
    )
  ),
});

