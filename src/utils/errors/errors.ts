import LoginError, { LoginErrors } from "./loginError";
import MyValidationErrors from "./myValidationError";

import type { ValidationError } from "express-validator";
import NoTokenError from "./noTokenError";
import InvalidTokenError from "./invalidTokenError";

interface NormalError {
  status: number;
  message: string;
  stack?: string;
}

interface CUnknownError extends NormalError {
  type: "Unknown";
}

interface CError extends NormalError {
  type: "Error";
}

interface CValidationError extends NormalError {
  type: "ValidationError";
  validationErrors: ValidationError[];
}

interface CLoginError extends NormalError {
  type: "LoginError";
  loginErrors: LoginErrors;
}

interface CNoTokenError extends NormalError {
  type: "NoTokenError";
}

interface CInvalidTokenError extends NormalError {
  type: "InvalidToken";
}

export interface ErrorResponseData {
  error:
    | CUnknownError
    | CError
    | CValidationError
    | CLoginError
    | CNoTokenError
    | CInvalidTokenError;
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
      type: "Unknown",
      status: responseStatus,
      message: "Unknown Error",
      stack: "No Stack",
    },
  };

  if (!(error instanceof Error)) {
    return { responseStatus, responseData };
  }

  responseData = {
    error: {
      ...responseData.error,
      type: "Error",
      message: error.message,
      stack: error.stack,
    },
  };

  if (error instanceof MyValidationErrors) {
    responseStatus = 400;
    responseData = {
      error: {
        ...responseData.error,
        type: "ValidationError",
        status: responseStatus,
        validationErrors: error.validationErrors,
      },
    };
  } else if (error instanceof LoginError) {
    responseStatus = 401;
    responseData = {
      error: {
        ...responseData.error,
        type: "LoginError",
        status: responseStatus,
        loginErrors: error.loginErrors,
      },
    };
  } else if (error instanceof NoTokenError) {
    responseStatus = 400;
    responseData = {
      error: {
        ...responseData.error,
        type: "NoTokenError",
        status: responseStatus,
      },
    };
  } else if (error instanceof InvalidTokenError) {
    responseStatus = 401;
    responseData = {
      error: {
        ...responseData.error,
        type: "InvalidToken",
        status: responseStatus,
      },
    };
  }

  return { responseStatus, responseData };
};
