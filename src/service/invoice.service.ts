import { IAddress } from '../models/invoice.model';
import { invoiceModel } from '../mongoose/invoice.mongoose';

export class InvoiceService {
    public async createInvoice(userId: string, total: number, address: IAddress) {
        const newInvoice = new invoiceModel({
            userId,
            total,
            address,
        });
        const doc = await newInvoice.save();
        return doc;
    }
}
