const mongoose = require("mongoose");

const InvoiceDetailSchema = new mongoose.Schema({
    invoiceId: {
        type: mongoose.Types.ObjectId,
        required: [true, "Invoice Id is required"],
    },
    productId: {
        type: mongoose.Types.ObjectId,
        required: [true, "Product id is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"]
    },
    total: {
        type: Number,
        required: [true, "Total is required"],
    },
});


const InvoiceDetail = mongoose.model("invoice-detail", InvoiceDetailSchema);

module.exports = InvoiceDetail;
