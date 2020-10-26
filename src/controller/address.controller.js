const message = require("../constants/response.const");
const Address = require("../mongoose/models/address.moongose.model");
const responseService = require("../services/response.service");

const addressController = {};

addressController.getAddress = async (req, res) => {
    let address = await Address.find().lean();
    if (!address) responseService(res, 404, message.NOT_FOUND);
    responseService(res, 200, message.SUCCESS, address);
};

addressController.createAddress = async (req, res) => {
    let address = Address.createAddress(req.body);
    if (!address) responseService(res, 500, message.DB_ERR);
    await address.save();

    responseService(res, 201, message.CREATED, address);
};

addressController.deleteAddress = async (req, res) => {
    let address = await Address.findByIdAndDelete({
        _id: req.params.id,
    }).lean();
    if (!address) responseService(res, 404, message.NOT_FOUND);
    responseService(res, 200, message.DELETED, address);
};

addressController.updateAddress = async (req, res) => {
    let address = await Address.findById({_id: req.params.id});

    address = await Address.findByIdAndUpdate(
        { _id: req.params.id },
        {
            city: req.body.city ? req.body.city : address.city,
            district: req.body.district ? req.body.district : address.district,
            ward: req.body.ward ? req.body.ward : address.ward,
            address: req.body.address ? req.body.address : address.address
        },
        { new: true }
    );

    if (!address) responseService(res, 404, message.NOT_FOUND);
    
    responseService(res, 200, message.UPDATED, address);
};

module.exports = addressController;
