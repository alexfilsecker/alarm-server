import { getGmtOffsetFromDb } from "../prisma/gmtOffset";
import influxClient, { INFLUX_DATABASE, INFLUX_SCALE_TABLE } from "./client";

export const getPoints = async (): Promise<number[][]> => {
  const result = influxClient.query(
    `SELECT * FROM ${INFLUX_SCALE_TABLE} WHERE time >= now() - INTERVAL '3h';`,
    INFLUX_DATABASE,
  );

  const memResult: number[][] = [];
  for await (const row of result) {
    memResult.push([row.time, row.read]);
  }

  memResult.sort((a, b) => a[0] - b[0]);
  const gmtOffset = await getGmtOffsetFromDb();
  console.log(gmtOffset);

  const pointsWithGmtOffset = memResult.map((point) => [
    point[0] + gmtOffset * 1000,
    point[1],
  ]);

  return pointsWithGmtOffset;
};
