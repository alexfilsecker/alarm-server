import { Request, Response } from "express";
import ControllerAction from "./controllerAction";
import { getAlarms } from "../prisma/alarm";
import { Day } from "../../prisma/generated";

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

const alarmController = {
  get: async (req: Request, res: Response) => {
    void ControllerAction(req, res, getAction);
  },
};

export default alarmController;
