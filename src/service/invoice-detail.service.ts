import { InvoiceDetailModel } from '../mongoose/invoice-detail.mongoose';
import { ProductModel } from '../mongoose/product.mongoose';
import {
    IInvoiceDetail,
    IInvoiceDetailModel,
    INVOICE_DETAIL_STATUS,
} from '../models/invoice-detail.model';
import { IProduct, PRODUCT_STATUS } from '../models/product.model';
import { InvoiceService } from './invoice.service';

interface IInvoiceDetailService {
    getInvoiceDetailById: (id: string) => Promise<IInvoiceDetail>;
    getInvoiceDetails: (invoiceId: string) => Promise<IInvoiceDetail[]>;

    deleteInvoiceDetail: (invoiceDetailId: string) => Promise<IInvoiceDetail>;

    createManyInvoiceDetails: (
        invoiceId: string,
        cart: IInvoiceDetailModel[]
    ) => Promise<IInvoiceDetail[]>;
}

const invoiceService = new InvoiceService();

export default class InvoiceDetailService implements IInvoiceDetailService {
    public async getInvoiceDetailById(id: string) {
        const foundInvoiceDetail = await InvoiceDetailModel.findById(id)
            .populate('productId')
            .populate('sellerId', 'profile email')
            .populate('invoiceId', 'userId');
        if (!foundInvoiceDetail) return null;
        // const doc = await foundInvoiceDetail.populate('productId');
        return foundInvoiceDetail;
    }

    public async getInvoiceDetails(invoiceId: string) {
        const foundInvoiceDetails = await InvoiceDetailModel.find({
            invoiceId,
        })
            .populate('productId')
            .populate('sellerId', 'profile')
            .populate('invoiceId', 'userId');
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
            sellerId: invoiceDetail.sellerId,
            quantity: invoiceDetail.quantity,
            total: invoiceDetail.total,
            status: INVOICE_DETAIL_STATUS.IN_PROGRESS,
        });
        await this._calculateQuantityAndUpdateItem(
            newInvoiceDetail._id,
            newInvoiceDetail.productId
        );
        return newInvoiceDetail;
    }

    public async getSellerInvoiceDetail(sellerId: string) {
        const foundInvoiceDetail = await InvoiceDetailModel.find({ sellerId });

        if (!foundInvoiceDetail) return null;

        return foundInvoiceDetail;
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
        if (foundProduct.quantity === 0) {
            foundProduct.status = PRODUCT_STATUS.OFFLINE;
        }
        const updatedProductQuantity = await foundProduct.save();
        return updatedProductQuantity;
    }

    public async updateInvoiceDetailStatus(invoiceDetailId: string) {
        let foundInvoiceDetail = await InvoiceDetailModel.findById(invoiceDetailId);

        foundInvoiceDetail.status = INVOICE_DETAIL_STATUS.DONE;

        const updatedInvoiceDetailStatus = await foundInvoiceDetail.save();

        await invoiceService.updateInvoiceStatusV1(foundInvoiceDetail.invoiceId);

        return updatedInvoiceDetailStatus;
    }

    public async countTotalInvoice() {
        const total = await InvoiceDetailModel.find({ status: 1 });
        return total.length;
    }
}
