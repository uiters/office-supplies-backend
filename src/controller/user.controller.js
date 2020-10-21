const { User } = require("../mongoose/models/user.mongoose.model");
const responseService = require("../services/response.service");
const message = require("../constants/response.const");


const userController = {};

userController.getUser = async (req, res, next) => {
  let user = await User.find().populate("userProducts", "productName product");
  responseService(res, 200, message.SUCCESS, user);
};

userController.getCurrentUser = async (req, res, next) => {
  try {
    let userId = req.user;
    let user = await User.findById({ _id: userId._id }).populate(
      "userProducts"
    );
    responseService(res, 200, "success", user);
  } catch (error) {
    next(err);
  }
};

userController.createUser = async (req, res, next) => {};

module.exports = userController;
