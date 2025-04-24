export default class NoTokenError extends Error {
  constructor() {
    super("No Bearer Token Provided");
    this.name = "NoTokenError";
  }
}
