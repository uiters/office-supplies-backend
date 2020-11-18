import mongoose from 'mongoose';
import { IAddress, IInvoice } from '../models/invoice.model';

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
});

export const invoiceModel = mongoose.model<IInvoice>('invoice', invoiceSchema);
