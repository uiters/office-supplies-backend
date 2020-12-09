import { INVOICE_DETAIL_STATUS } from '../models/invoice-detail.model';
import { IAddress, INVOICE_STATUS } from '../models/invoice.model';
import { invoiceModel } from '../mongoose/invoice.mongoose';

export class InvoiceService {
    public async createInvoice(userId: string, total: number, address: IAddress) {
        const newInvoice = new invoiceModel({
            userId,
            total,
            address,
            status: INVOICE_STATUS.IN_PROGRESS,
        });
        const doc = await newInvoice.save();
        return doc;
    }

    public async getInvoices(userId: string) {
        const foundInvoices = await invoiceModel
            .find({ userId })
            .populate('userId', 'email')
            .populate('getInvoiceDetails')
            .lean();
        if (foundInvoices) {
            return foundInvoices;
        } else return null;
    }

    

    public async deleteInvoice(id: string) {
        const deletedInvoice = await invoiceModel.findByIdAndDelete(id);
        if (deletedInvoice) return deletedInvoice;
        return null;
    }

    public async updateInvoiceStatus(id: string) {
        const foundInvoice = await invoiceModel.findById(id);
        if (!foundInvoice) return null;
        foundInvoice.status = INVOICE_STATUS.SHIPPED;
        const savedInvoice = await foundInvoice.save();
        return savedInvoice;
    }

    public async updateInvoiceStatusV1(invoiceId: string) {
        let isDone = false;
        const foundInvoice = await invoiceModel.findById(invoiceId).populate('getInvoiceDetails');

        for (let item of foundInvoice.getInvoiceDetails) {
            console.log(item)
            if (item.status === INVOICE_DETAIL_STATUS.DONE) {
                isDone = true;
            } else isDone = false;
        }
        
        if (isDone) {
            foundInvoice.status = INVOICE_STATUS.SHIPPED;
        } else foundInvoice.status = INVOICE_STATUS.IN_PROGRESS;

        await foundInvoice.save();
    }
}
