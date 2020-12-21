import { invoiceModel } from '../mongoose/invoice.mongoose';
import { ProductModel } from '../mongoose/product.mongoose';

export class StatisticService {
    public async totalProducts() {
        const products = await ProductModel.find().countDocuments();
        // let total = 0;
        // for (let product of products) {
        //     total += product.quantity;
        // }
        return products;
    }

    public async totalInvoices() {
        const finishInvoices = await invoiceModel.find({ status: 1 });
        const wattingInvoices = await invoiceModel.find({ status: 0 });
        let totalPriceInvoices = 0;
        for (let invoice of finishInvoices) {
            totalPriceInvoices += invoice.total;
        }
        return {
            totalFinishInvoices: finishInvoices.length,
            totalPriceFinishInvoices: totalPriceInvoices,
            totalWattingInvoices: wattingInvoices.length,
        };
    }
}
