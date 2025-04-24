import jwt from "jsonwebtoken";

import type { Request, Response, NextFunction } from "express";
import { getTokenEnvs } from "../utils/tokenEnvs";
import { handleError } from "../utils/errors/errors";
import NoTokenError from "../utils/errors/noTokenError";
import InvalidTokenError from "../utils/errors/invalidTokenError";

interface DecodedToken {
  id: number;
  username: string;
}

export type RequestWithDecodedToken = Request & {
  decodedToken: DecodedToken | null;
};
const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token === undefined) {
      throw new NoTokenError();
    }

    const { tokenSecretKey } = getTokenEnvs();

    const decodedToken = jwt.verify(token, tokenSecretKey);
    if (typeof decodedToken === "string") {
      throw new InvalidTokenError();
    }
    req.user = decodedToken as jwt.JwtPayload & DecodedToken;
    next();
  } catch (error: unknown) {
    const { responseData, responseStatus } = handleError(error);
    res.status(responseStatus).json(responseData);
  }
};

export default verifyToken;
