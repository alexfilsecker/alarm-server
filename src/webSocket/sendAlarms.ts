import { WebSocket } from "ws";
import { getAlarms } from "../prisma/alarm";

const sendAlarms = async (ws: WebSocket): Promise<void> => {
  const alarms = await getAlarms();

  ws.send(
    JSON.stringify({
      event: "Alarms",
      alarms,
    }),
  );
};

export default sendAlarms;
