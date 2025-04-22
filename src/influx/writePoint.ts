import { Point } from "@influxdata/influxdb3-client";
import influxClient, { INFLUX_DATABASE, INFLUX_SCALE_TABLE } from "./client";

export const writePoint = async (read: number, timestamp: Date) => {
  const point = Point.measurement(INFLUX_SCALE_TABLE)
    .setFloatField("read", read)
    .setTimestamp(timestamp);

  console.log("writing point");
  await influxClient.write(point, INFLUX_DATABASE);
  console.log("point writen");
};
