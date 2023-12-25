import { ValidationError } from 'express-validator';

import MyValidationErrors from './myValidationError';

type NormalError = {
  status: number;
  message: string;
  stack?: string;
};

type CUnknownError = NormalError & {
  type: 'Unknown';
};

type CError = NormalError & {
  type: 'Error';
};

type CValidationError = NormalError & {
  type: 'ValidationError';
  validationErrors: ValidationError[];
};

export type ErrorResponseData = {
  error: CUnknownError | CError | CValidationError;
};

export const handleError = (error: unknown) => {
  let responseStatus = 500;
  let responseData: ErrorResponseData = {
    error: {
      type: 'Unknown',
      status: responseStatus,
      message: 'Unknown Error',
      stack: 'No Stack'
    }
  };
  if (error instanceof Error) {
    responseData = {
      error: {
        ...responseData.error,
        type: 'Error',
        message: error.message,
        stack: error.stack
      }
    };
    if (error instanceof MyValidationErrors) {
      responseStatus = 400;
      responseData = {
        error: {
          ...responseData.error,
          type: 'ValidationError',
          status: responseStatus,
          validationErrors: error.validationErrors
        }
      };
    }
  }

  return { responseStatus, responseData };
};
