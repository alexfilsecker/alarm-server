import { Alarm } from "../../prisma/generated";
import prismaClient from "./prisma";

export const getAlarms = async (): Promise<Omit<Alarm, "id">[]> => {
  return prismaClient.alarm.findMany({
    select: {
      day: true,
      start: true,
      end: true,
    },
  });
};
