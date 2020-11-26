import { NextFunction, Request, Response } from 'express';
import { AuthRequest } from '../types/utils';
import InvoiceDetailService from '../service/invoice-detail.service';
import { InvoiceService } from '../service/invoice.service';

const invoiceDetailService = new InvoiceDetailService();
const invoiceService = new InvoiceService();
export default class InvoiceDetailController {
    public async getInvoiceDetailById(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const foundInvoiceDetail = await invoiceDetailService.getInvoiceDetailById(id);
            if (!foundInvoiceDetail) return res.status(404).json('Not found');
            res.status(200).json(foundInvoiceDetail);
        } catch (error) {
            res.status(400).json('Failed');
        }
        return next();
    }
    public async getInvoiceDetails(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { invoiceId } = req.body;
            const foundInvoiceDetails = await invoiceDetailService.getInvoiceDetails(invoiceId);
            if (!foundInvoiceDetails) return res.status(404).json('Not found');
            res.status(200).json(foundInvoiceDetails);
        } catch (error) {
            res.status(400).json('Failed');
        }
        return next();
    }

    public async createInvoiceDetail(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { _id } = req.user;
            const { total, address, cart } = req.body;
            const invoice = await invoiceService.createInvoice(_id, total, address);
            const invoiceDetail = await invoiceDetailService.createManyInvoiceDetails(
                invoice._id,
                cart
            );
            if (!invoiceDetail) return res.status(400).json('Failed');
            res.status(201).json(invoiceDetail);
        } catch (error) {
            res.status(400).json('Failed');
        }
        return next();
    }

    public async deleteInvoiceDetail(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const deletedInvoiceDetail = await invoiceDetailService.deleteInvoiceDetail(id);
            if (!deletedInvoiceDetail) return res.status(404).json('Not found');
            return res.status(200).json(deletedInvoiceDetail);
        } catch (error) {
            res.status(400).json('Failed');
        }

        return next();
    }
}
