import { type User } from '@prisma/client';
import { type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';

import prisma from '../prisma';
import { comparePassword } from '../utils/auth';
import AuthError from '../utils/errors/authError';

import ControllerAction from './controllerAction';

type UserTokenData = {
  userID: number;
  username: string;
};

type RefreshTokenData = {
  userID: number;
};

type TokenEnvs = {
  tokenSecretKey: string;
  refreshTokenSecretKey: string;
  tokenExprationTime: string;
  refreshTokenExprationTime: string;
};
const getTokenEnvs = (): TokenEnvs => {
  const tokenSecretKey = process.env.TOKEN_SECRET_KEY;
  if (tokenSecretKey === undefined) {
    throw new Error('Token secret key not found');
  }
  const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY;
  if (refreshTokenSecretKey === undefined) {
    throw new Error('Refresh token secret key not found');
  }
  const tokenExprationTime = process.env.TOKEN_EXPIRATION_TIME;
  if (tokenExprationTime === undefined) {
    throw new Error('Token expiration time not found');
  }
  const refreshTokenExprationTime = process.env.REFRESH_TOKEN_EXPIRATION_TIME;
  if (refreshTokenExprationTime === undefined) {
    throw new Error('Refresh token expiration time not found');
  }

  return {
    tokenSecretKey,
    refreshTokenSecretKey,
    tokenExprationTime,
    refreshTokenExprationTime,
  };
};

const makeTokens = (user: User): { token: string; refreshToken: string } => {
  const {
    tokenSecretKey,
    refreshTokenSecretKey,
    tokenExprationTime,
    refreshTokenExprationTime,
  } = getTokenEnvs();

  const userTokenData: UserTokenData = {
    userID: user.id,
    username: user.username,
  };

  const token = jwt.sign(userTokenData, tokenSecretKey, {
    expiresIn: tokenExprationTime,
  });

  const refreshTokenData: RefreshTokenData = {
    userID: user.id,
  };

  const refreshToken = jwt.sign(refreshTokenData, refreshTokenSecretKey, {
    expiresIn: refreshTokenExprationTime,
  });

  return {
    token,
    refreshToken,
  };
};

type LoginActionResult = {
  responseData: {
    token: string;
    refreshToken: string;
  };
  status: number;
};

const loginAction = async (req: Request): Promise<LoginActionResult> => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({ where: { username } });
  if (user === null) {
    throw new AuthError('username does not exist', 'username');
  }

  const correctPassword = await comparePassword(
    password as string,
    user.password,
  );

  if (!correctPassword) {
    throw new AuthError('Incorrect password', 'password');
  }

  const { token, refreshToken } = makeTokens(user);

  return {
    responseData: {
      token,
      refreshToken,
    },
    status: 200,
  };
};

type RefreshActionResult = {
  responseData: {
    newToken: string;
    newRefreshToken: string;
  };
  status: number;
};

const refreshAction = async (req: Request): Promise<RefreshActionResult> => {
  const { refreshToken } = req.body;
  if (typeof refreshToken !== 'string') {
    throw new Error('Refresh token not found');
  }

  const { refreshTokenSecretKey } = getTokenEnvs();

  const decodedRefreshToken = jwt.verify(
    refreshToken,
    refreshTokenSecretKey,
  ) as RefreshTokenData | string;
  if (typeof decodedRefreshToken === 'string') {
    throw new Error('Invalid refresh token');
  }
  const user = await prisma.user.findUnique({
    where: { id: decodedRefreshToken.userID },
  });
  if (user === null) {
    throw new Error('User not found');
  }

  const { token: newToken, refreshToken: newRefreshToken } = makeTokens(user);

  return {
    responseData: {
      newToken,
      newRefreshToken,
    },
    status: 200,
  };
};

const authController = {
  login: async (req: Request, res: Response) => {
    void ControllerAction(req, res, loginAction);
  },
  refresh: async (req: Request, res: Response) => {
    void ControllerAction(req, res, refreshAction);
  },
};

export default authController;
