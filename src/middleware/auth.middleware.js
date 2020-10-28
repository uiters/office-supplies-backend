const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    if (!req.header("x-auth-token"))
        return res.status(401).send("Access denided. No token provided");

    const token = req.header("x-auth-token").split(" ");

    if (token[0] !== "bearer") return res.status(401).send("Access denided. Invalid!");
    try {
        const decode = jwt.verify(token[1], process.env.SECRET_KEY);
        req.user = decode;
        next();
    } catch (ex) {
        res.status(400).send("Invalid token!");
    }
}

module.exports = auth;
