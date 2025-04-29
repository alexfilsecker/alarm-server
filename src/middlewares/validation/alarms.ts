import { z } from "zod";
import { zodValidation } from "./zodValidation";

const alarmSchema = z.object({
  start: z
    .number()
    .gte(0)
    .lt(24 * 60 - 1),

  end: z
    .number()
    .gte(0)
    .lt(24 * 60 - 1),
  enabled: z.boolean(),
});

const putAlarmsSchema = z.object({
  MONDAY: alarmSchema,
  TUESDAY: alarmSchema,
  WEDNESDAY: alarmSchema,
  THURSDAY: alarmSchema,
  FRIDAY: alarmSchema,
  SATURDAY: alarmSchema,
  SUNDAY: alarmSchema,
});

export type PutAlarmsBodyType = z.infer<typeof putAlarmsSchema>;

export const putAlarmsValidation = zodValidation(putAlarmsSchema);
