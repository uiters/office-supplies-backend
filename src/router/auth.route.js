const message = require("../constants/response.const");
const { User } = require("../mongoose/models/user.mongoose.model");
const SendEmailService = require("../services/sendEmail.service");
const responseService = require("../services/response.service");
const jwt = require("jsonwebtoken");
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

  if (user.status === 0) {
    responseService(
      res,
      401,
      "please check your email to activate your account"
    );
  }

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

  let token = jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_RESET,
    {
      expiresIn: process.env.JWT_RESET_EXPIRES_IN,
    }
  );
  user.resetToken = token;

  await user.save().then((res) => {
    transporter.createMailOptions(
      "reset password",
      "oh la la",
      `<p>You requested for password reset</p>
            <h3>click in this <a href="http://${req.headers.host}/reset/${token}">link</a> to reset your password</h3>`
    );
    transporter.sendEmail();
  });
  responseService(res, 200, "check your email", token);
});

router.post("/new_password", async (req, res) => {
  const newPassword = req.body.newPassword;

  const sentToken = req.body.sentToken;

  let user = await User.findOne({ resetToken: sentToken });

  if (!user) responseService(res, 422, "Your token is expired. Try again!");

  user.password = newPassword;
  user.resetToken = undefined;

  await user.save();

  responseService(res, 200, message.SUCCESS, user);
});

module.exports = router;
