import { Alarm, Day } from "../../prisma/generated";
import { PutAlarmsBodyType } from "../middlewares/validation/alarms";
import prismaClient from "./prisma";

export const getAlarms = async (): Promise<Omit<Alarm, "id">[]> => {
  return prismaClient.alarm.findMany({
    select: {
      day: true,
      start: true,
      end: true,
      enabled: true,
    },
  });
};

export const updateAlarms = async (body: PutAlarmsBodyType): Promise<void> => {
  const promises = Object.entries(body).map(async ([day, alarmInfo]) => {
    await prismaClient.alarm.update({
      where: {
        day: day as Day,
      },
      data: {
        start: alarmInfo.start,
        end: alarmInfo.end,
        enabled: alarmInfo.enabled,
      },
    });
  });
  await Promise.all(promises);
};
