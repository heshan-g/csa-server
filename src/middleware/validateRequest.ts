import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import handleError from '../utils/handleError';
import AppError from '../utils/AppError';

const validateBody =
  (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { value, error } = schema.validate(req.body, { abortEarly: false });

      if (error) {
        throw new AppError(400, 'Invalid request', error.details);
      }

      Object.assign(req, value);

      next();
    } catch (err) {
      handleError(err, res);
    }
  };

export default validateBody;

