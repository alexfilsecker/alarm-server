import { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
import alarmController from "../controllers/alarmController";

const alarmRouter = Router();
alarmRouter.use(verifyToken);

alarmRouter.get("/", (req, res): void => {
  void alarmController.get(req, res);
});

export default alarmRouter;
