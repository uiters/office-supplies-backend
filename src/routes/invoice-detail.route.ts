import express from 'express';
import { authJwt } from '../config/passport';
import InvoiceDetailController from '../controller/invoice-detail.controller';
import { createInvoiceDetailValidate } from '../util/validatiors/invoice-detail.validate';

const router = express.Router();
const invoiceDetailController = new InvoiceDetailController();

router.get('/invoice-id/:id', authJwt, invoiceDetailController.getInvoiceDetailById);
router.get('/seller-invoice/:sellerId', authJwt, invoiceDetailController.getSellerInvoiceDetail);

router.post('/', authJwt, createInvoiceDetailValidate, invoiceDetailController.createInvoiceDetail);

router.put('/status', authJwt, invoiceDetailController.updateInvoiceDetailStatus);

router.delete('/:id', invoiceDetailController.deleteInvoiceDetail);

export default router;
