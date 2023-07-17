import { NextFunction, Request, Response } from 'express';
import * as userService from '../modules/user/user.service';
import * as authService from '../modules/auth/auth.service';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { AppError, handleError } from '../utils';
import config from '../config/config';

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken } = req.signedCookies;

    if (!accessToken) {
      throw new AppError(401, 'Missing access token');
    }

    const publicKey = fs.readFileSync(
      path.resolve(__dirname, '../../keys/jwtRS256.key.pub'),
      'utf8'
    );

    const verifiedJwt = <jwt.JwtPayload>jwt.verify(accessToken, publicKey);

    // if (!authService.isRefreshTokenAvailable(verifiedJwt.userId)) {
    //   throw new AppError(401, 'User not logged in');
    // }

    const user = await userService.getUserById(verifiedJwt.userId);

    if (user) {
      req.locals = {
        user: {
          id: verifiedJwt.userId,
        },
      };
    }

    next();
  } catch (err) {
    handleError(err, res);
  }
};

export default authenticate;
