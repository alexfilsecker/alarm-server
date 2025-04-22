import { Point } from "@influxdata/influxdb3-client";
import influxClient, { INFLUX_DATABASE, INFLUX_SCALE_TABLE } from "./client";

export const writePoint = async () => {
  const point = Point.measurement(INFLUX_SCALE_TABLE).setFloatField(
    "read",
    2.4,
  );

  console.log("writing point");
  await influxClient.write(point, INFLUX_DATABASE);
  console.log("point writen");
};
