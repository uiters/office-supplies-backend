import { Document } from "mongoose";

export interface IInvoice extends Document {
    userId: string;
    total: number;
    address: IAddress;
}

export interface IAddress {
    city: string;
    district: string;
    ward: string;
    street: string;
}