class ErrorType {
  constructor(status, code, msg) {
    this.status = status;
    this.code = code;
    this.msg = msg;
  }
}

module.exports = {
  AUTH_VERIFICATION_FAILED: new ErrorType(401, 40100, "Unauthorized"),
  LOGIN_AUTH_FAILED: new ErrorType(401, 40101, "Unauthorized"),
};
