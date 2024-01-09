import { type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';

import ControllerAction from './controllerAction';
import ROOT_USER from '../utils/constants/user';

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

const makeTokens = () => {
  const {
    tokenSecretKey,
    refreshTokenSecretKey,
    tokenExprationTime,
    refreshTokenExprationTime,
  } = getTokenEnvs();

  const user = { id: ROOT_USER.id, username: ROOT_USER.name };
  const token = jwt.sign(user, tokenSecretKey, {
    expiresIn: tokenExprationTime,
  });
  const refreshToken = jwt.sign(
    { user_id: ROOT_USER.id },
    refreshTokenSecretKey,
    {
      expiresIn: refreshTokenExprationTime,
    },
  );

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
  const { password } = req.body;
  if (password !== '1234') {
    throw new Error('Incorrect password');
  }

  const { token, refreshToken } = makeTokens();

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

  const { refreshTokenSecretKey } = getTokenEnvs();

  const decodedRefreshToken = jwt.verify(refreshToken, refreshTokenSecretKey);
  console.log('🚀 - decodedRefreshToken:', decodedRefreshToken);
  if (typeof decodedRefreshToken === 'string') {
    throw new Error('Invalid refresh token');
  }
  if (decodedRefreshToken.user_id !== ROOT_USER.id) {
    throw new Error('Invalid refresh token');
  }

  const { token: newToken, refreshToken: newRefreshToken } = makeTokens();

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
