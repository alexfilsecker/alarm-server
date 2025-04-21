import { Day } from "../../prisma/generated";
import prisma from "./prisma";

const DAY_ORDER = [
  Day.MONDAY,
  Day.TUESDAY,
  Day.WEDNESDAY,
  Day.THURSDAY,
  Day.FRIDAY,
  Day.SATURDAY,
  Day.SUNDAY,
];

export const getAlarms = async (): Promise<number[][]> => {
  const alarmRows = await prisma.alarm.findMany();

  const returnAlarms: number[][] = [];
  DAY_ORDER.forEach((day) => {
    const alarm = alarmRows.find((row) => row.day === day);
    if (alarm === undefined) {
      return;
    }
    returnAlarms.push([alarm.start, alarm.end]);
  });

  return returnAlarms;
};
