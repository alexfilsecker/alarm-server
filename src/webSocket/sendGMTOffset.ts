import { WebSocket } from "ws";
import axios from "axios";

const TIME_ZONE_API_URL = "https://timeapi.io";

interface TimeZoneResponseData {
  currentUtcOffset: {
    seconds: number;
  };
}

const sendGMTOffset = async (ws: WebSocket) => {
  const zoneInfoPath = "/api/timezone/zone";
  const timeZone = "America/Santiago";

  let response;
  try {
    response = await axios.get<TimeZoneResponseData>(
      TIME_ZONE_API_URL + zoneInfoPath,
      {
        params: {
          timeZone,
        },
      },
    );
  } catch (e) {
    console.log("Error", e);
    return;
  }

  const offset = response.data.currentUtcOffset.seconds / 3600;

  ws.send(
    JSON.stringify({
      event: "GMTOffset",
      offset,
    }),
  );
};

export default sendGMTOffset;
