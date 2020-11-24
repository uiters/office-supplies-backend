import { Document } from 'mongoose';

export enum INVOICE_STATUS {
    WAITTING = 1,
    SHIPPED = 2,
}
export interface IInvoice extends Document {
    userId: string;
    total: number;
    address: IAddress;
    status: INVOICE_STATUS;
}

export interface IAddress {
    city: string;
    district: string;
    ward: string;
    street: string;
}
