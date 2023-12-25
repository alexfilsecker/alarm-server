import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { handleError } from '../utils/errors/errors';
import MyValidationErrors from '../utils/errors/myValidationError';

export type NormalResponse = { responseData: unknown; status?: number };

const ControllerAction = async (
  req: Request,
  res: Response,
  action: (_req: Request) => Promise<NormalResponse>
) => {
  let responseData: unknown;
  let responseStatus = 200;
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw new MyValidationErrors('Bad Request', validationErrors.array());
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
