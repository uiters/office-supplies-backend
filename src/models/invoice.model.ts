import { Document } from 'mongoose';
import { IInvoiceDetail, IInvoiceDetailModel } from './invoice-detail.model';

export enum INVOICE_STATUS {
    IN_PROGRESS = 0,
    SHIPPED = 1,
}
export interface IInvoice extends Document {
    userId: string;
    total: number;
    address: IAddress;
    status: INVOICE_STATUS;
    getInvoiceDetails?: IInvoiceDetailModel[]
}

export interface IAddress {
    city: string;
    district: string;
    ward: string;
    street: string;
}
