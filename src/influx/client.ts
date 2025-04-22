import { InfluxDBClient } from "@influxdata/influxdb3-client";

const readEnv = (varName: string): string => {
  const varValue = process.env[varName];
  if (varValue === undefined) {
    throw new Error(`${varName} is undefined`);
  }
  return varValue;
};

const INFLUX_HOST = readEnv("INFLUX_HOST");
const INFLUX_TOKEN = readEnv("INFLUXDB3_AUTH_TOKEN");
export const INFLUX_DATABASE = readEnv("INFLUXDB3_DATABASE_NAME");
export const INFLUX_SCALE_TABLE = readEnv("INFLUX_SCALE_TABLE");

const influxClient = new InfluxDBClient({
  host: INFLUX_HOST,
  token: INFLUX_TOKEN,
});

export default influxClient;
