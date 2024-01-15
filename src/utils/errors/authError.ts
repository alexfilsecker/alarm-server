type ErrorIn = 'username' | 'password';

export default class AuthError extends Error {
  public errorIn: ErrorIn;

  constructor(message: string, errorIn: ErrorIn) {
    super(message);
    this.name = 'AuthError';
    this.errorIn = errorIn;
  }
}
