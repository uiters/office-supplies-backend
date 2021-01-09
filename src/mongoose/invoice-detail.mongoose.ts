import moongose from 'mongoose';
import { IInvoiceDetail, INVOICE_DETAIL_STATUS } from '../models/invoice-detail.model';

const invoiceDetail = new moongose.Schema(
    {
        invoiceId: {
            type: moongose.Types.ObjectId,
            required: true,
            ref: 'invoice',
        },
        sellerId: {
            type: moongose.Types.ObjectId,
            required: true,
            ref: 'user',
        },
        productId: {
            type: moongose.Types.ObjectId,
            required: true,
            ref: 'product',
        },
        quantity: {
            type: Number,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        status: {
            type: Number,
            required: true,
            validate: {
                validator: (value: INVOICE_DETAIL_STATUS) => {
                    return Object.values(INVOICE_DETAIL_STATUS).includes(value);
                },
            },
        },
    },
    { timestamps: true }
);

// invoiceDetail.pre('find', function () {
//     this.populate('sellerId', 'profile')
//         .populate('productId', 'productName')
//         // .populate('invoiceId');
// });

export const InvoiceDetailModel = moongose.model<IInvoiceDetail>('invoicedetail', invoiceDetail);
