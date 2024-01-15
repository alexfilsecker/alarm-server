import AuthError from './authError';
import MyValidationErrors from './myValidationError';

import type { ValidationError } from 'express-validator';

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

type CAuthError = NormalError & {
  type: 'AuthError';
  errorIn: 'username' | 'password';
};

export type ErrorResponseData = {
  error: CUnknownError | CError | CValidationError | CAuthError;
};

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
    } else if (error instanceof AuthError) {
      responseStatus = 400;
      responseData = {
        error: {
          ...responseData.error,
          type: 'AuthError',
          status: responseStatus,
          errorIn: error.errorIn,
        },
      };
    }
  }

  return { responseStatus, responseData };
};
