module.exports = function Response(code, httpStatus, message) {
    this.code = code;
    this.httpStatus = httpStatus;
    this.message = message;
}