import { InvoiceDetailModel } from '../mongoose/invoice-detail.mongoose';
import { ProductModel } from '../mongoose/product.mongoose';
import { IInvoiceDetail, IInvoiceDetailModel } from '../models/invoice-detail.model';
import { IProduct } from '../models/product.model';

interface IInvoiceDetailService {
    getInvoiceDetailById: (id: string) => Promise<IInvoiceDetail>;
    getInvoiceDetails: (invoiceId: string) => Promise<IInvoiceDetail[]>;

    deleteInvoiceDetail: (invoiceDetailId: string) => Promise<IInvoiceDetail>;

    createManyInvoiceDetails: (
        invoiceId: string,
        cart: IInvoiceDetailModel[]
    ) => Promise<IInvoiceDetail[]>;
}

export default class InvoiceDetailService implements IInvoiceDetailService {
    public async getInvoiceDetailById(id: string) {
        const foundInvoiceDetail = await InvoiceDetailModel.findById(id).populate(
            'productId',
            'productName'
        );
        if (!foundInvoiceDetail) return null;
        const doc = await foundInvoiceDetail.populate('productId');
        return doc;
    }

    public async getInvoiceDetails(invoiceId: string) {
        const foundInvoiceDetails = await InvoiceDetailModel.find({
            invoiceId,
        }).populate('productId');
        if (!foundInvoiceDetails) return null;
        return foundInvoiceDetails;
    }

    public async deleteInvoiceDetail(invoiceDetailId: string) {
        const deletedInvoiceDetail = await InvoiceDetailModel.findByIdAndDelete(invoiceDetailId);
        if (!deletedInvoiceDetail) return null;
        return deletedInvoiceDetail;
    }

    private async _createInvoiceDetail(invoiceId: string, invoiceDetail: IInvoiceDetailModel) {
        const newInvoiceDetail = await InvoiceDetailModel.create({
            invoiceId,
            productId: invoiceDetail.productId,
            quantity: invoiceDetail.quantity,
            total: invoiceDetail.total,
        });
        await this._calculateQuantityAndUpdateItem(
            newInvoiceDetail._id,
            newInvoiceDetail.productId
        );
        return newInvoiceDetail;
    }

    public async createManyInvoiceDetails(invoiceId: string, cart: IInvoiceDetailModel[]) {
        const promises = await Promise.all(
            cart.map((entity) => {
                return this._createInvoiceDetail(invoiceId, entity);
            })
        );
        return promises;
    }

    private async _calculateQuantityAndUpdateItem(invoiceDetailId: string, productId: string) {
        let foundInvoiceDetail = await InvoiceDetailModel.findById(invoiceDetailId);
        let foundProduct = await ProductModel.findById(productId);
        foundProduct.quantity -= foundInvoiceDetail.quantity;
        const updatedProductQuantity = await foundProduct.save();
        return updatedProductQuantity;
    }
}
