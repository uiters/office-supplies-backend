const message = require("../constants/response.const");
const InvoiceDetail = require("../mongoose/models/invoice-detail.mongoose.model");
const Invoice = require("../mongoose/models/invoice.mongoose.model");
const responseService = require("../services/response.service");
const invoiceController = require("./invoice.controller");

const invoiceDetailController = {};

invoiceDetailController.getInvoiceDetailById = async (req, res) => {
    let invoiceDetail = InvoiceDetail.findById({ _id: req.params.id });

    if (!invoiceDetail) return responseService(res, 404, message.NOT_FOUND);

    responseService(res, 200, message.SUCCESS, invoiceDetail);
};

invoiceDetailController.createInvoiceDetail = async (req, res) => {
    let invoice = Invoice.findOne({ userId: req.user._id });
    if (!invoice) {
        invoiceController.createInvoice();
    } else {
        // let invoiceDetails = InvoiceDetail.insertMany([...req.body]);
    }
};

module.exports = invoiceDetailController;
