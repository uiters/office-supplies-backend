const requestService = (callback) => {
    return async function (req, res, next) {
        try {
          await callback(req, res);
        } catch (error) {
          next(error);
        }
    };
};

module.exports = requestService;
