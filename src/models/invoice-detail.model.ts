import { Document } from 'mongoose';

export interface IInvoiceDetail extends Document {
    invoiceId: string;
    productId: string;
    quantity: number;
    total: number;
}
