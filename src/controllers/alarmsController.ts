import { type Request, type Response } from 'express';

import prisma from '../prisma';

import ControllerAction from './controllerAction';

type GetAlarmsResponse = {
  responseData: unknown;
  status: number;
};

type Alarms = Record<
  string,
  {
    startTime: string;
    endTime: string;
    enabled: boolean;
  }
>;

const getAlarmsAction = async (req: Request): Promise<GetAlarmsResponse> => {
  if (req.user === undefined) {
    throw new Error('User not found');
  }

  const userAlarmsResult = await prisma.alarm.findMany({
    where: { userId: req.user.userId },
    select: {
      enabled: true,
      startTime: true,
      endTime: true,
      weekDay: {
        select: { name: true },
      },
    },
  });

  const userAlarms: Alarms = userAlarmsResult.reduce(
    (result: Alarms, userAlarm) => {
      result[userAlarm.weekDay.name] = {
        startTime: userAlarm.startTime,
        endTime: userAlarm.endTime,
        enabled: userAlarm.enabled,
      };
      return result;
    },
    {},
  );

  return {
    responseData: userAlarms,
    status: 200,
  };
};

const alarmsController = {
  getAlarms: (req: Request, res: Response) => {
    void ControllerAction(req, res, getAlarmsAction);
  },
};

export default alarmsController;
