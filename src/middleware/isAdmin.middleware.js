function admin(req, res, next) {
    // 403 Forbidden
    // 401 Unauthorized
    if (!req.user.isAdmin) return res.status(403).send("Access denied");

    next();
}

module.exports = admin;