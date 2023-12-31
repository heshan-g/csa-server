import AppError from '../../utils/AppError';
import { compare } from 'bcrypt';
import fs from 'fs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import path from 'path';
import * as userService from '../user/user.service';
import config from '../../config/config';
import { Response } from 'express';
import moment from 'moment';
import { RefreshToken } from './auth.model';

export const findUser = async (email: string, password: string) => {
  const user = await userService.getUserByEmail(email);

  if (
    !user ||
    !(await compare(password, user.password))
  ) {
    throw new AppError(401, 'Incorrect email or password');
  }

  return user?.toObject();
}

export const signAccessToken = async (payload: { userId: string }) => {
  const privateKey = fs.readFileSync(
    path.resolve(__dirname, '../../../keys/jwtRS256.key'),
    'utf8'
  );

  const accessTokenExpiry = config.application.accessTokenExpiryInSeconds;

  return jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: accessTokenExpiry,
  });
};

export const signRefreshToken = async (payload: { userId: string }) => {
  const secret = config.application.refreshTokenSecret;

  if (!secret) {
    throw 'Refresh token secret was not found';
  }

  const refreshTokenExpiry = config.application.refreshTokenExpiryInSeconds;

  return jwt.sign(payload, secret, { expiresIn: refreshTokenExpiry });
};

export const storeRefreshToken = async (
  userId: string,
  refreshToken: string
) => {
  const refreshTokenExpiry = config.application.refreshTokenExpiryInSeconds;
  const expireAt = moment().add(refreshTokenExpiry, 'seconds').utc().format();

  await RefreshToken.findOneAndUpdate(
    { userId },
    {
      userId,
      refreshToken,
      expireAt,
    },
    { upsert: true },
  );
};

export const setAccessTokenCookie = (res: Response, token: string) => {
  res.cookie('accessToken', token, {
    httpOnly: true,
    signed: true,
    maxAge: config.application.accessTokenExpiryInSeconds * 1000,
  });
};

export const setRefreshTokenCookie = (res: Response, token: string) => {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    signed: true,
    maxAge: config.application.refreshTokenExpiryInSeconds * 1000,
  });
};

export const verifyRefreshToken = (refreshToken: string) => {
  const refreshTokenSecret = config.application.refreshTokenSecret;

  try {
    const payload = jwt.verify(refreshToken, refreshTokenSecret) as JwtPayload;

    return payload;
  } catch (error: any) {
    throw new AppError(401, error.message, error.name);
  }
};

export const isRefreshTokenAvailable = async (
  userId: string,
  refreshToken?: string
) => {
  const filter: { userId: string; refreshToken?: string } = { userId };

  refreshToken && (filter.refreshToken = refreshToken);

  return !!(await RefreshToken.findOne(filter));
};

export const logout = async (refreshToken: string) => {
  return await RefreshToken.findOneAndDelete({
    refreshToken,
  });
};

export const deleteCookies = (res: Response, ...cookieNames: string[]) => {
  cookieNames.forEach((cookieName) => {
    res.clearCookie(cookieName);
  });
};

