const message = require("../constants/response.const");
const Invoice = require("../mongoose/models/invoice.mongoose.model");
const responseService = require("../services/response.service");

const invoiceController = {};

invoiceController.getAllInvoices = async (req, res) => {
    let invoice = await Invoice.find().lean();
    if (!invoice) return responseService(res, 404, message.NOT_FOUND);
    responseService(res, 200, message.SUCCESS, invoice);
};

invoiceController.getInvoiceBy = async (req, res) => {
    let invoice;

    invoice = await Invoice.find().lean().getInvoiceById(req.params.id);

    if (!invoice) return responseService(res, 404, message.NOT_FOUND);

    responseService(res, 200, message.SUCCESS, invoice);
};

invoiceController.createInvoice = async (req, res) => {
    let invoice = Invoice.createInvoice(req.body);

    await invoice.save();

    responseService(res, 201, message.CREATED, invoice);
};

module.exports = invoiceController;
