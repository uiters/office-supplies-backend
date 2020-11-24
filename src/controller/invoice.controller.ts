import { NextFunction, Response } from 'express';
import { InvoiceService } from '../service/invoice.service';
import { AuthRequest } from '../types/utils';

const invoiceService = new InvoiceService();
export class InvoiceController {
    public async createInvoice(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { _id } = req.user;
            const { total, address } = req.body;
            const newInvoice = await invoiceService.createInvoice(_id, total, address);
            if (!newInvoice) return res.status(400).json('Failed');
            res.status(201).json(newInvoice);
        } catch (error) {
            res.status(400).json('Failed');
        }
        return next();
    }
    public async getInvoices(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { _id } = req.user;
            const foundInvoices = await invoiceService.getInvoices(_id);
            if (!foundInvoices) res.status(404).json('Not found');
            res.status(200).json(foundInvoices);
        } catch (error) {
            res.status(400).json('Failed');
        }
        return next();
    }

    public async deleteInvoice(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.body;
            const deletedInvoice = await invoiceService.deleteInvoice(id);
            if (!deletedInvoice) return res.status(404).json('Not found');
            res.status(200).json(deletedInvoice);
        } catch (error) {
            res.status(400).json('Failed');
        }
        return next();
    }

    public async updateInvoiceStatus(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.body;
            const updatedInvoice = await invoiceService.updateInvoiceStatus(id);
            if (!updatedInvoice) return res.status(404).json('Not found');
            res.status(200).json(updatedInvoice);
        } catch (error) {
            res.status(400).json('Failed');
        }
        return next();
    }
}
