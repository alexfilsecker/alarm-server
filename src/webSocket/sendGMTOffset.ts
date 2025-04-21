import { WebSocket } from "ws";
import { getGmtOffsetFromDb } from "../prisma/gmtOffset";

const sendGMTOffset = async (ws: WebSocket) => {
  const offset = await getGmtOffsetFromDb();

  ws.send(
    JSON.stringify({
      event: "GMTOffset",
      offset,
    }),
  );
};

export default sendGMTOffset;
