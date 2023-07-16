import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const validateBody =
  (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { value, error } = schema.validate(req.body, { abortEarly: false });

      if (error) {
        res.status(400).json({
          ValidationErrors: error.details,
        });

        return;
      }

      Object.assign(req, value);

      next();
    } catch (error) {
      res.status(400).json(error);
    }
  };

export default validateBody;

