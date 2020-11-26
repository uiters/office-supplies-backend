import { invoiceModel } from "../mongoose/invoice.mongoose";
import { InvoiceDetailModel } from "../mongoose/invoice-detail.mongoose";
import { ProductModel } from "../mongoose/product.mongoose";
import { IInvoiceDetail } from "../models/invoice-detail.model";
import { IProduct } from "../models/product.model";

interface IInvoiceDetailService {
  getInvoiceDetailById: (id: string) => Promise<IInvoiceDetail>;
  getInvoiceDetails: (invoiceId: string) => Promise<IInvoiceDetail[]>;

  _calculateQuantityAndUpdateItem: (
    invoiceDetailId: string,
    productId: string
  ) => Promise<IProduct>;

  _calculateTotal: (invoiceDetailId: string) => Promise<number>;
}

export default class InvoiceDetailService implements IInvoiceDetailService {
  public async getInvoiceDetailById(id: string) {
    const foundInvoiceDetail = await InvoiceDetailModel.findById(id);
    if (!foundInvoiceDetail) return null;
    const doc = await foundInvoiceDetail.populate("productId");
    return doc;
  }

  public async getInvoiceDetails(invoiceId: string) {
    const foundInvoiceDetails = await InvoiceDetailModel.find({
      invoiceId
    }).populate("productId");
    if (!foundInvoiceDetails) return null;
    return foundInvoiceDetails;
  }

  public async createInvoiceDetail() {}

  //   !TEST
  public async _calculateQuantityAndUpdateItem(
    invoiceDetailId: string,
    productId: string
  ) {
    let foundInvoiceDetail = await InvoiceDetailModel.findById(invoiceDetailId);
    let foundProduct = await ProductModel.findById(productId);
    foundProduct.quantity -= foundInvoiceDetail.quantity;
    const updatedProductQuantity = await foundProduct.save();
    return updatedProductQuantity;
  }

  //   !TEST
  public async _calculateTotal(invoiceDetailId: string) {
    const foundInvoiceDetail = await InvoiceDetailModel.findById(
      invoiceDetailId
    );
    const foundProduct = await ProductModel.findById(
      foundInvoiceDetail.productId
    );
    const total = foundInvoiceDetail.quantity * foundProduct.price;
    return total;
  }
}
