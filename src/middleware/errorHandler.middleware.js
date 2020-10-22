const responseService = require("../services/response.service");

const errorHandler = (err, req, res,next) => {
  if (400 < err.code <= 500) {
    err.code = 500;
  }
  responseService(res, err.code, err.message);
};

module.exports = errorHandler;