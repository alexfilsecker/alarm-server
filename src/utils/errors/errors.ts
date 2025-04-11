import MyValidationErrors from './myValidationError';

import type { ValidationError } from 'express-validator';

interface NormalError {
  status: number;
  message: string;
  stack?: string;
}

interface CUnknownError extends NormalError {
  type: 'Unknown';
}

interface CError extends NormalError {
  type: 'Error';
}

interface CValidationError extends NormalError {
  type: 'ValidationError';
  validationErrors: ValidationError[];
}

export interface ErrorResponseData {
  error: CUnknownError | CError | CValidationError;
}

export const handleError = (
  error: unknown,
): {
  responseStatus: number;
  responseData: ErrorResponseData;
} => {
  let responseStatus = 500;
  let responseData: ErrorResponseData = {
    error: {
      type: 'Unknown',
      status: responseStatus,
      message: 'Unknown Error',
      stack: 'No Stack',
    },
  };
  if (error instanceof Error) {
    responseData = {
      error: {
        ...responseData.error,
        type: 'Error',
        message: error.message,
        stack: error.stack,
      },
    };
    if (error instanceof MyValidationErrors) {
      responseStatus = 400;
      responseData = {
        error: {
          ...responseData.error,
          type: 'ValidationError',
          status: responseStatus,
          validationErrors: error.validationErrors,
        },
      };
    }
  }

  return { responseStatus, responseData };
};
