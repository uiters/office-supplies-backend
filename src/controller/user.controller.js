const { User } = require("../mongoose/models/user.mongoose.model");
const responseService = require("../services/response.service");
const message = require("../constants/response.const");

const userController = {};

userController.getUser = async (req, res, next) => {
    let user = await User.find().populate(
        "userProducts",
        "productName product"
    );
    responseService(res, 200, message.SUCCESS, user);
};

userController.getCurrentUser = async (req, res, next) => {
    let userId = req.user;
    let user = await User.findById({ _id: userId._id }).populate(
        "userProducts"
    );
    responseService(res, 200, message.SUCCESS, user);
};

userController.getUserById = async (req, res, next) => {
    let user = await User.findById({ _id: req.params.id })
        .populate("userProducts")
        .lean();
    responseService(res, 200, message.SUCCESS, user);
};

userController.createUser = async (req, res, next) => {
    let user = new User({
        email: req.body.email,
        password: req.body.password,
        profile: req.body.profile,
        phoneNumber: req.body.phoneNumber,
        isAdmin: req.body.isAdmin | false,
        status: req.body.status | 0,
    });
    await user.save();
    responseService(res, 201, message.CREATED, user);
};

userController.updateUser = async (req, res, next) => {
    user = await User.findByIdAndUpdate(
        { _id: req.params.id },
        {
            email: newUserInfo.email,
            password: newUserInfo.password,
            profile: newUserInfo.profile,
            status: newUserInfo.status,
        },
        { new: true }
    );
    if (!user) return responseService(res, 404, message.NOT_FOUND);
    responseService(res, 200, message.UPDATED, user);
};

userController.deleteUser = async (req, res) => {
    let user = await User.findOneAndDelete({ email: req.body.email }).lean();
    if (!user) return responseService(404, message.NOT_FOUND);
    responseService(res, 200, message.DELETED, user);
};

module.exports = userController;
