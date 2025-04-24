export default class InvalidTokenError extends Error {
  constructor() {
    super("Invalid Token");
    this.name = "InvalidTokenError";
  }
}
