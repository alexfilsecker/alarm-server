import { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
import alarmController from "../controllers/alarmController";
import { putAlarmsValidation } from "../middlewares/validation/alarms";

const alarmRouter = Router();
alarmRouter.use(verifyToken);

alarmRouter.get("/", (req, res): void => {
  void alarmController.get(req, res);
});

alarmRouter.put("/", putAlarmsValidation, (req, res): void => {
  void alarmController.put(req, res);
});

export default alarmRouter;
