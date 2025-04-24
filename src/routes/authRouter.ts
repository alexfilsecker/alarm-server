import { Router } from "express";

import authController from "../controllers/authController";
import verifyToken from "../middlewares/verifyToken";

const authRouter = Router();

authRouter.post("/login", (req, res): void => {
  void authController.login(req, res);
});

authRouter.post("/refresh", (req, res): void => {
  void authController.refresh(req, res);
});

authRouter.post("/verify", verifyToken, (req, res): void => {
  void authController.verify(req, res);
});

export default authRouter;
