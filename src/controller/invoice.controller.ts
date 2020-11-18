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
    public async getInvoice(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            
        } catch (error) {
            
        }
        return next();
    }
}
