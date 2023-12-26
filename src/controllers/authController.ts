import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import ControllerAction from './controllerAction';

const secretKey = 'secretKey';

const loginAction = async (req: Request) => {
  const { password } = req.body;
  if (password !== '1234') {
    throw new Error('Incorrect password');
  }

  const user = { id: 1, username: 'Alex' };
  const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

  return {
    responseData: {
      token
    },
    status: 200
  };
};

const authController = {
  login: (req: Request, res: Response) =>
    ControllerAction(req, res, loginAction)
};

export default authController;
