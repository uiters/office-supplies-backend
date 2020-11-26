import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../types/utils";
import InvoiceDetailService from "../service/invoice-detail.service";
import { InvoiceDetailModel } from "../mongoose/invoice-detail.mongoose";
import { ProductModel } from "../mongoose/product.mongoose";
import { InvoiceService } from "../service/invoice.service";

const invoiceDetailService = new InvoiceDetailService();
const invoiceService = new InvoiceService();
export default class InvoiceDetailController {
  public async getInvoiceDetailById(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.body;
      const foundInvoiceDetail = await invoiceDetailService.getInvoiceDetailById(
        id
      );
      if (!foundInvoiceDetail) return res.status(404).json("Not found");
      res.status(200).json(foundInvoiceDetail);
    } catch (error) {
      res.status(400).json("Failed");
    }
    return next();
  }
  public async getInvoiceDetails(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { invoiceId } = req.body;
      const foundInvoiceDetails = await invoiceDetailService.getInvoiceDetails(
        invoiceId
      );
      if (!foundInvoiceDetails) return res.status(404).json("Not found");
      res.status(200).json(foundInvoiceDetails);
    } catch (error) {
      res.status(400).json("Failed");
    }
    return next();
  }

  public async createInvoiceDetail(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      //   const { _id } = req.user;
      //   const invoice = await invoiceService.createInvoice();
    } catch (error) {
      res.status(400).json("Failed");
    }
    return next();
  }
}
