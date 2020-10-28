const { User } = require('../mongoose/models/user.mongoose.model');

const router = require('express').Router();

/**
 * @swagger
 * 
 * path: 
 *  /api/auth/login:
 *      post:
 *          tags:
 *              - "auth"
 *          summary: "Login"
 *          operationId: "login"
 *          consumes:
 *          -   "application/json"
 *          proceduces:
 *          -   "application/json"
 *          parameters: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              email:
 *                                  required: true
 *                                  type: "string"
 *                              password:
 *                                  required: true
 *                                  type: "string"
 *          responses:
 *              "200":
 *                  description: "login success"
 *              "404":
 *                  description: "Invalid email or password"
 */


router.post('/login', async (req, res) => {
    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(404).send('Invalid email!')
    const isCorrectPass = await user.comparePass(req.body.password, user.password);
    if(!isCorrectPass) return res.status(404).send('Invalid password!')

    const token = user.createToken();

    res.send(`bearer ${token}`);
})

module.exports = router