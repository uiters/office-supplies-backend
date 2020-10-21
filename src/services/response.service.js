function responseService(res,statusCode, message, data) {
    return res.status(statusCode).send({
        message: message ? message : 'SOMETHING BROKEN',
        statusCode: statusCode | 500,
        data: data ? data : null,
    })
}

module.exports = responseService
