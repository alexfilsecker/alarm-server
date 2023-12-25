import { ValidationError } from 'express-validator';

export default class MyValidationErrors extends Error {
  public validationErrors: ValidationError[];

  constructor(message: string, validationErrors: ValidationError[]) {
    super(message);
    this.name = 'ValidationErrors';
    this.validationErrors = validationErrors;
  }
}
