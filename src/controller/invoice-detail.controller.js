const message = require("../constants/response.const");
const InvoiceDetail = require("../mongoose/models/invoice-detail.mongoose.model");
const Invoice = require("../mongoose/models/invoice.mongoose.model");
const { Product } = require("../mongoose/models/product.mongoose.model");
const responseService = require("../services/response.service");

const invoiceDetailController = {};

invoiceDetailController.getInvoiceDetailById = async (req, res) => {
    let invoiceDetail = InvoiceDetail.findById({ _id: req.params.id });

    if (!invoiceDetail) return responseService(res, 404, message.NOT_FOUND);

    responseService(res, 200, message.SUCCESS, invoiceDetail);
};

invoiceDetailController.createInvoiceDetail = async (req, res) => {

    let invoice;
    let product;

    if (!Array.isArray(req.body)) {
        return responseService(res, 406, "request body must be an array!");
    }

    invoice = await Invoice.findOne({ _id: req.body[0].invoiceId }).lean();

    if (!invoice) {
        return responseService(res, 404, message.NOT_FOUND);
    }

    for (let invoiceItem of req.body) {
        product = Product.findById({ _id: invoiceItem.productId }).lean();

        if (invoiceItem.quantity > product.quantity) {
            responseService(res, 406, "invalid");
        }
        product.quantity -= invoiceItem.quantity;

        await product.save();
    }

    if (invoice.userId != req.user._id) {
        return responseService(res, 406, "invalid invoice ID");
    }

    let invoiceDetail = await InvoiceDetail.insertMany(req.body);

    return responseService(res, 201, message.CREATED, invoiceDetail);

};  

module.exports = invoiceDetailController;
