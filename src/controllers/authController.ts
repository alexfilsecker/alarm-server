import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import ROOT_USER from "../utils/constants/user";
import ControllerAction from "./controllerAction";
import LoginError from "../utils/errors/loginError";
import { getTokenEnvs } from "../utils/tokenEnvs";

const makeTokens = (): { token: string; refreshToken: string } => {
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
    { expiresIn: refreshTokenExprationTime },
  );

  return {
    token,
    refreshToken,
  };
};

interface LoginActionResult {
  responseData: {
    token: string;
    refreshToken: string;
  };
  status: number;
}

const loginAction = async (req: Request): Promise<LoginActionResult> => {
  const { password, username } = req.body;

  let passwordError = "";
  if (password !== "1234") {
    passwordError = "Incorrect password";
  }

  let usernameError = "";
  if (username !== "alex") {
    usernameError = "incorrect username";
  }

  if (usernameError) {
    throw new LoginError({
      username: usernameError === "" ? undefined : usernameError,
      password: passwordError === "" ? undefined : passwordError,
    });
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

interface RefreshActionResult {
  responseData: {
    newToken: string;
    newRefreshToken: string;
  };
  status: number;
}

const refreshAction = async (req: Request): Promise<RefreshActionResult> => {
  const { refreshToken } = req.body;
  if (typeof refreshToken !== "string") {
    throw new Error("Refresh token not found");
  }

  const { refreshTokenSecretKey } = getTokenEnvs();

  const decodedRefreshToken = jwt.verify(refreshToken, refreshTokenSecretKey);
  if (typeof decodedRefreshToken === "string") {
    throw new Error("Invalid refresh token");
  }
  if (decodedRefreshToken.user_id !== ROOT_USER.id) {
    throw new Error("Invalid refresh token");
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

interface VerifyActionResult {
  responseData: {
    valid: boolean;
  };
  status: number;
}

const verifyAction = async (_: Request): Promise<VerifyActionResult> => {
  return {
    responseData: {
      valid: true,
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
  verify: async (req: Request, res: Response) => {
    void ControllerAction(req, res, verifyAction);
  },
};

export default authController;
