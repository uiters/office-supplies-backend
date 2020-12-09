import express from 'express';
import { authJwt } from '../config/passport';
import { InvoiceController } from '../controller/invoice.controller';
import { isAdmin } from '../util/permission.util';

const router = express.Router();
const invoiceController = new InvoiceController();

router.get('/', authJwt, invoiceController.getInvoices);
// router.get('/', authJwt, invoiceController.)

router.delete('/:id', authJwt, isAdmin, invoiceController.deleteInvoice);
export default router;
