import { Request, Response } from 'express';
import * as authService from './auth.service';
import handleError from '../../utils/handleError';
import { AppError } from '../../utils';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await authService.findUser(email, password);

    const [accessToken, refreshToken] = await Promise.all([
      authService.signAccessToken({ userId: user._id }),
      authService.signRefreshToken({ userId: user._id }),
    ]);

    authService.storeRefreshToken(user._id, refreshToken);

    authService.setAccessTokenCookie(res, accessToken);
    authService.setRefreshTokenCookie(res, refreshToken);

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    handleError(err, res);
  }
}

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.signedCookies;

    if (!refreshToken) {
      throw new AppError(401, 'Invalid or missing refresh token');
    }

    const payload = authService.verifyRefreshToken(refreshToken);

    const { userId } = payload;

    const isRefreshTokenAvailable = await authService.isRefreshTokenAvailable(
      userId,
      refreshToken
    );

    if (!isRefreshTokenAvailable) {
      throw new AppError(401, 'Refresh token revoked (logged out)');
    }

    const accessToken = await authService.signAccessToken({ userId });

    authService.setAccessTokenCookie(res, accessToken);

    res.status(200).send('Access token refreshed successfully.');
  } catch (err) {
    handleError(err, res);
  }
}

export const logout = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.signedCookies;

    authService.verifyRefreshToken(refreshToken);

    const userId = await authService.logout(refreshToken);

    const responseMessage = userId
      ? 'User logged out'
      : 'User was not logged in';

    authService.deleteCookies(res, 'accessToken', 'refreshToken');

    res.status(200).send(responseMessage);
  } catch (err) {
    handleError(err, res);
  }
};

