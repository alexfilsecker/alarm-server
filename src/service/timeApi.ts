import axios from "axios";

interface TimeZoneResponseData {
  currentUtcOffset: {
    seconds: number;
  };
}

export interface GmtData {
  offset: number;
  fetchedAt: Date;
}

const TIME_ZONE_API_URL = "https://timeapi.io";

export const getGmtOffset = async (): Promise<GmtData> => {
  const zoneInfoPath = "/api/timezone/zone";
  const timeZone = "America/Santiago";

  let done = false;
  let count = 0;
  let response;
  let fetchedAt = new Date();
  while (!done) {
    try {
      fetchedAt = new Date();
      response = await axios.get<TimeZoneResponseData>(
        TIME_ZONE_API_URL + zoneInfoPath,
        {
          params: {
            timeZone,
          },
        },
      );
      done = true;
    } catch {
      console.log("Error fetching timezone api");
    }
    count += 1;
    if (count > 3) {
      throw new Error("Fetching TimeZoneAPI reached max attempts");
    }
  }

  if (response === undefined) {
    throw new Error("TimeZoneAPI response is undefined");
  }

  const offset = response.data.currentUtcOffset.seconds;

  return {
    offset,
    fetchedAt,
  };
};
