function responseService(res,statusCode, message, data) {
    return res.status(statusCode).send({
        message: message ? message : '',
        data: data ? data : null,
    })
}

module.exports = responseService
