import jwt from 'jsonwebtoken';

import type { Request, Response, NextFunction } from 'express';

interface DecodedToken {
  id: number;
  username: string;
}

export type RequestWithDecodedToken = Request & {
  decodedToken: DecodedToken | null;
};
const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token === undefined) {
    throw new Error('Token not found');
  }
  const tokenSecretKey = process.env.TOKEN_SECRET_KEY;
  if (tokenSecretKey === undefined) {
    throw new Error('Token secret key not found');
  }

  try {
    const decodedToken = jwt.verify(token, tokenSecretKey);
    if (typeof decodedToken === 'string') {
      throw new Error('Invalid token');
    }
    req.user = decodedToken as jwt.JwtPayload & DecodedToken;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export default verifyToken;
