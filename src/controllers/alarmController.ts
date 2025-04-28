import { Request, Response } from "express";
import ControllerAction from "./controllerAction";
import { Day } from "../../prisma/generated";
import { getAlarms } from "../prisma/alarm";

type ReturnAlarms = Record<Day, { start: number; end: number }>;

interface GetActionResult {
  responseData: ReturnAlarms;
}

const getAction = async (_: Request): Promise<GetActionResult> => {
  const alarmRows = await getAlarms();

  const returnAlarms = alarmRows.reduce((alarms, alarm) => {
    alarms[alarm.day] = {
      start: alarm.start,
      end: alarm.end,
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
