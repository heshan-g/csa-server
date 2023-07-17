import { Request, Response } from 'express';
import * as userService from './user.service';
import handleError from '../../utils/handleError';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const userId = await userService.createUser({ name, email, password });

    res.status(201).json({ userId });
  } catch (err) {
    handleError(err, res);
  }
}

