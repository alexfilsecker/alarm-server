import { Router } from 'express';

import authController from '../controllers/authController';

const authRouter = Router();

authRouter.post('/login', (req, res): void => {
  void authController.login(req, res);
});

authRouter.post('/refresh', (req, res): void => {
  void authController.refresh(req, res);
});

export default authRouter;
