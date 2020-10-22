const message = require("../constants/response.const");
const { Type } = require("../mongoose/models/type.mongoose.model");
const responseService = require("../services/response.service");

const typeController = {};

typeController.getType = async (req, res) => {
    let type = await Type.find().lean();
    responseService(res, 200, message.SUCCESS, type);
};

typeController.createType = async (req, res) => {
    let type = Type.createType(req.body);
    await type.save();
    responseService(res, 201, message.SUCCESS, type);
};

typeController.updateType = async (req, res) => {
    let type = await Type.findByIdAndUpdate(
        { _id: req.params.id },
        {
            typeName: req.body.typeName,
        },
        {new: true}
    ).lean();
    if (!type) return responseService(res, 404, message.NOT_FOUND);
    responseService(res, 200, message.UPDATED, type);
};

typeController.deleteType = async (req, res) => {
    let type = await Type.findByIdAndDelete({ _id: req.params.id }).lean();
    if (!type) return responseService(res, 404, message.NOT_FOUND, type);
    responseService(res, 200, message.DELETED, type);
};

module.exports = typeController;
