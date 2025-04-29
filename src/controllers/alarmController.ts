import { Request, Response } from "express";
import ControllerAction from "./controllerAction";
import { getAlarms, updateAlarms } from "../prisma/alarm";
import { Day } from "../../prisma/generated";
import type { ParamsDictionary } from "express-serve-static-core";
import { PutAlarmsBodyType } from "../middlewares/validation/alarms";

type ReturnAlarms = Record<
  Day,
  { start: number; end: number; enabled: boolean }
>;

interface GetActionResult {
  responseData: ReturnAlarms;
}

const getAction = async (_: Request): Promise<GetActionResult> => {
  const alarmRows = await getAlarms();

  const returnAlarms = alarmRows.reduce((alarms, alarm) => {
    alarms[alarm.day] = {
      start: alarm.start,
      end: alarm.end,
      enabled: alarm.enabled,
    };
    return alarms;
  }, {} as ReturnAlarms);

  return {
    responseData: returnAlarms,
  };
};

interface PutActionResult {
  responseData: object;
  status: 204;
}

const putAction = async (
  req: Request<ParamsDictionary, unknown, PutAlarmsBodyType>,
): Promise<PutActionResult> => {
  await updateAlarms(req.body);
  return {
    responseData: {},
    status: 204,
  };
};

const alarmController = {
  get: async (req: Request, res: Response) => {
    void ControllerAction(req, res, getAction);
  },
  put: async (req: Request, res: Response) => {
    void ControllerAction<PutAlarmsBodyType>(req, res, putAction);
  },
};

export default alarmController;
