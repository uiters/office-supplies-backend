import mongoose from 'mongoose';

export enum INVOICE_DETAIL_STATUS {
    IN_PROGRESS = 0,
    DONE = 1,
}
export interface IInvoiceDetail extends mongoose.Document {
    invoiceId: string;
    productId: string;
    quantity: number;
    total: number;
    status: INVOICE_DETAIL_STATUS;
    sellerId: string;
}

export interface IInvoiceDetailModel {
    invoiceId: string;
    productId: string;
    quantity: number;
    total: number;
    status: INVOICE_DETAIL_STATUS;
    sellerId: string;
}
