import { Request, Response } from 'express';
import * as authService from './auth.service';
import handleError from '../../utils/handleError';

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

