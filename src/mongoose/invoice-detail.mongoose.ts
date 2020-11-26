import moongose from 'mongoose';
import { IInvoiceDetail } from '../models/invoice-detail.model';

const invoiceDetail = new moongose.Schema(
    {
        invoiceId: {
            type: moongose.Types.ObjectId,
            required: true,
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
    },
    { timestamps: true }
);

export const InvoiceDetailModel = moongose.model<IInvoiceDetail>('invoicedetail', invoiceDetail);
