import mongoose from 'mongoose';

export interface IInvoiceDetail extends mongoose.Document {
    invoiceId: string;
    productId: string;
    quantity: number;
    total: number;
}

export interface IInvoiceDetailModel {
    invoiceId: string;
    productId: string;
    quantity: number;
    total: number;
}
