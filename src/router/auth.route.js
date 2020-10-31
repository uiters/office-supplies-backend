const message = require("../constants/response.const");
const { User } = require("../mongoose/models/user.mongoose.model");
const SendEmailService = require("../services/sendEmail.service");
const responseService = require("../services/response.service");

const router = require("express").Router();

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

router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("Invalid email!");
  const isCorrectPass = await user.comparePass(
    req.body.password,
    user.password
  );
  if (!isCorrectPass) return res.status(404).send("Invalid password!");

  const token = user.createToken();

  res.send(`bearer ${token}`);
});

router.post("/reset_password", async (req, res) => {
  let transporter = new SendEmailService(req.body.email);

  let user = await User.findOne({ email: req.body.email });
  if (!user) responseService(res, 404, message.NOT_FOUND);

  let token = user.createToken();
  user.resetToken = token;

  await user.save().then((res) => {
    transporter.createMailOptions(
      "reset password",
      "oh la la",
      `<p>You requested for password reset</p>
            <h3>click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset your password</h3>`
    );
    transporter.sendResetPasswordEmail();
  });
  responseService(res, 200, message.SUCCESS);
});

module.exports = router;
