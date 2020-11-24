import mongoose from 'mongoose';
import { IAddress, IInvoice, INVOICE_STATUS } from '../models/invoice.model';

const invoiceSchema = new mongoose.Schema({
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
});

export const invoiceModel = mongoose.model<IInvoice>('invoice', invoiceSchema);
