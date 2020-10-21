const requestService = callback => {
  return function(req, res, next) {
    try {
      return callback(req, res);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = requestService;
