import { ZodSchema } from "zod";
import { NextFunction, Request, Response } from "express";

export const zodValidation =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json(result.error);
      return;
    }
    req.body = result.data;
    return next();
  };
