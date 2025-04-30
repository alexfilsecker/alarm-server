import { WebSocket } from "ws";
import { getAlarms } from "../prisma/alarm";
import { Day } from "../../prisma/generated";

const DAY_ORDER = [
  Day.MONDAY,
  Day.TUESDAY,
  Day.WEDNESDAY,
  Day.THURSDAY,
  Day.FRIDAY,
  Day.SATURDAY,
  Day.SUNDAY,
];

const sendAlarms = async (ws: WebSocket): Promise<void> => {
  const alarmRows = await getAlarms();

  const alarms: number[][] = [];
  DAY_ORDER.forEach((day) => {
    const alarm = alarmRows.find((row) => row.day === day);
    if (alarm === undefined) {
      return;
    }
    alarms.push([alarm.start, alarm.end, alarm.enabled ? 1 : 0]);
  });

  ws.send(
    JSON.stringify({
      event: "Alarms",
      alarms,
    }),
  );
};

export default sendAlarms;
