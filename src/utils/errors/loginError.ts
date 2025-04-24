export interface LoginErrors {
  username?: string;
  password?: string;
}

export default class LoginError extends Error {
  loginErrors: LoginErrors;
  constructor(loginErrors: LoginErrors) {
    super("Error during login");
    this.name = "LoginError";
    this.loginErrors = loginErrors;
  }
}
