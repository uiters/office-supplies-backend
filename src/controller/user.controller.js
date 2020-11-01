const { User } = require("../mongoose/models/user.mongoose.model");
const responseService = require("../services/response.service");
const message = require("../constants/response.const");
const SendEmailService = require("../services/sendEmail.service");
const crypto = require("crypto");

const userController = {};

userController.getUser = async (req, res, next) => {
  let user = await User.find().populate("userProducts", "productName product");

  responseService(res, 200, message.SUCCESS, user);
};

userController.getCurrentUser = async (req, res, next) => {
  let userId = req.user;

  let user = await User.findById({ _id: userId._id }).populate("userProducts");

  responseService(res, 200, message.SUCCESS, user);
};

userController.getUserById = async (req, res, next) => {
  let user = await User.findById({ _id: req.params.id })
    .populate("userProducts")
    .lean();

  responseService(res, 200, message.SUCCESS, user);
};

userController.createUser = async (req, res) => {
  let transporter = new SendEmailService(req.body.email);

  let emailToken = crypto.randomBytes(64).toString("hex");

  transporter.createMailOptions(
    "Email verification",
    "oh la la",
    `<p>You requested for Activate email</p>
      <h3>click in this http://${req.headers.host}/api/user/email_verification/${emailToken} to activate your account</h3>`
  );

  console.log(req.headers.host);

  let user = new User({
    email: req.body.email,
    emailToken: emailToken,
    password: req.body.password,
    profile: req.body.profile,
    isAdmin: req.body.isAdmin | false,
    status: req.body.status | 1,
  });

  await user.save().then((result) => {
    transporter
      .sendEmail()
      .then((res) => console.log("email sent"))
      .catch((err) => {
        responseService(res, 400, "Bad request");
      });
  });

  responseService(
    res,
    201,
    "Please check your email to verify your account",
    user
  );
};

userController.verifyEmail = async (req, res) => {
  let user = await User.findOne({ emailToken: req.params.token });

  if (!user) {
    responseService(res, 500, "Something went wrong");
  }

  user.status = 0;
  user.emailToken = undefined;

  await user.save();

  responseService(res, 200, message.SUCCESS, user);
};

userController.updateUser = async (req, res, next) => {
  let user = await User.findById({ _id: req.user._id });
  if (!user) return responseService(res, 404, message.NOT_FOUND);

  if (!req.body.password) return responseService(res, 500, message.DB_ERR);

  let hashPassword = await user.hashPassword(req.body.password);
  user = await User.findByIdAndUpdate(
    { _id: req.user._id },
    {
      email: req.body.email ? req.body.email : user.email,
      password: req.body.password ? hashPassword : user.password,
      profile: req.body.profile ? req.body.profile : user.profile,
    },
    { new: true }
  );

  responseService(res, 200, message.UPDATED, user);
};

userController.updateUserStatus = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user || err) {
    responseService(res, 404, message.NOT_FOUND);
  }
  user.status = req.body.status;
  await user.save();

  responseService(res, 200, message.UPDATED, user);
};

userController.deleteUser = async (req, res) => {
  let user = await User.findOneAndDelete({ _id: req.params.id }).lean();

  if (!user) return responseService(res, 404, message.NOT_FOUND);

  responseService(res, 200, message.DELETED, user);
};

module.exports = userController;
