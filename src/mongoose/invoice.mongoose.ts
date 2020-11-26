import mongoose from 'mongoose';
import { IAddress, IInvoice, INVOICE_STATUS } from '../models/invoice.model';

const invoiceSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'user',
        },
        total: {
            type: Number,
            required: true,
        },
        address: {
            city: String,
            district: String,
            ward: String,
            street: String,
        },
        status: {
            type: Number,
            required: true,
            validate: {
                validator: (value: INVOICE_STATUS) => {
                    return Object.values(INVOICE_STATUS).includes(value);
                },
            },
        },
    },
    { toJSON: { virtuals: true }, timestamps: true }
);

invoiceSchema.virtual('getInvoiceDetails', {
    ref: 'invoicedetail',
    localField: '_id',
    foreignField: 'invoiceId',
    options: { sort: { total: 1 } },
});

export const invoiceModel = mongoose.model<IInvoice>('invoice', invoiceSchema);
