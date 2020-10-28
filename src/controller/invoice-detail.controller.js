const message = require("../constants/response.const");
const InvoiceDetail = require("../mongoose/models/invoice-detail.mongoose.model");
const Invoice = require("../mongoose/models/invoice.mongoose.model");
const { Product } = require("../mongoose/models/product.mongoose.model");
const responseService = require("../services/response.service");
const invoiceController = require("./invoice.controller");

const invoiceDetailController = {};

invoiceDetailController.getInvoiceDetailById = async (req, res) => {
    let invoiceDetail = InvoiceDetail.findById({ _id: req.params.id });

    if (!invoiceDetail) return responseService(res, 404, message.NOT_FOUND);

    responseService(res, 200, message.SUCCESS, invoiceDetail);
};

invoiceDetailController.createInvoiceDetail = async (req, res) => {

    let invoice

    if(!Array.isArray(req.body)) {
        return responseService(res, 406, 'request body must be an array!')
    }
    
    invoice = await Invoice.findOne({ _id: req.body[0].invoiceId }).lean();

    console.log("invoiceUserID", invoice.userId)
    console.log("req.userId", req.body[0].userId);

    console.log(invoice.userId == req.body[0].userId)

    if (!invoice) {
        return responseService(res, 404, message.NOT_FOUND);
    }

    // if (product.quantity < req.body.quantity) {
    //     return responseService(res, 406, "invalid quantity");
    // }

    if (invoice.userId != req.user._id) {
        return responseService(res, 406, "invalid invoice ID");
    }

    let invoiceDetail = await InvoiceDetail.insertMany(req.body)

    return responseService(res, 201, message.CREATED, invoiceDetail);
};

module.exports = invoiceDetailController;
