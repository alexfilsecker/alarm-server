import { z } from "zod";

export const graphsSchema = z.object({
  range: z.string(),
});
