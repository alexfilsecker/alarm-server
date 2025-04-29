import { validationResult } from "express-validator";

import { handleError } from "../utils/errors/errors";
import MyValidationErrors from "../utils/errors/myValidationError";

import type { Request, Response } from "express";
import type { ParamsDictionary } from "express-serve-static-core";

export interface NormalResponse {
  responseData: unknown;
  status?: number;
}

const ControllerAction = async <T = object>(
  req: Request,
  res: Response,
  action: (_: Request<ParamsDictionary, unknown, T>) => Promise<NormalResponse>,
): Promise<Response<unknown, Record<string, unknown>>> => {
  let responseData: unknown;
  let responseStatus = 200;
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw new MyValidationErrors("Bad Request", validationErrors.array());
    }
    const actionResult = await action(req);
    responseData = actionResult.responseData;
    responseStatus = actionResult.status ?? 200;
  } catch (error: unknown) {
    const handledError = handleError(error);
    responseData = handledError.responseData;
    responseStatus = handledError.responseStatus;
  }

  return res.status(responseStatus).json(responseData);
};

export default ControllerAction;
