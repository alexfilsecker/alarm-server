import type { Request, Response, NextFunction } from 'express';

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('🚀 - token:', token);
  next();
};

export default verifyToken;
