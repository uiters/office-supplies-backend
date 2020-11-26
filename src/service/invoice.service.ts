import { IAddress, INVOICE_STATUS } from "../models/invoice.model";
import { invoiceModel } from "../mongoose/invoice.mongoose";

export class InvoiceService {
  public async createInvoice(userId: string, total: number, address: IAddress) {
    const newInvoice = new invoiceModel({
      userId,
      total,
      address,
      status: INVOICE_STATUS.SHIPPED
    });
    const doc = await newInvoice.save();
    return doc;
  }

  public async getInvoices(userId: string) {
    const foundInvoices = await invoiceModel
      .find({ userId })
      .populate("userId")
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
}
