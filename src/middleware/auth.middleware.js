const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send('Access denided. No token provided');

    try {
        const decode = jwt.verify(token, "JWT_SECRET");
        req.user = decode;
        next();
    } catch(ex){
        res.status(400).send('Invalid token!');
    }
}

module.exports = auth