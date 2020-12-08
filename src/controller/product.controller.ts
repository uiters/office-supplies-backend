import { NextFunction, Response } from "express";
import { IBook } from "../models/product.model";
import ProductService from "../service/product.service";
import { AuthRequest } from "../types/utils";

const productService = new ProductService();
export default class ProductController {
  public async createProduct(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      req.body.userId = req.user._id;
      const newProduct = await productService.createProduct(req.body);
      if (!newProduct) return res.status(400).json("Failed");
      res.status(201).json(newProduct);
    } catch (error) {
      return res.status(400).json("Failed");
    }
    return next();
  }
  public async getProducts(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { page, keyword, sortBy, typeId, categoryId } = req.query;
      const { result, pageCount, hasNext } = await productService.getProduct(
        +page,
        {
          keyword,
          sortBy,
          typeId,
          categoryId
        }
      );
      res.status(200).json({ result, pageCount, hasNext });
    } catch (error) {
      res.status(400).json("Failed");
    }
    return next();
  }

  public async getProductById(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const foundProduct = await productService.getProductById(id);
      if (!foundProduct) return res.status(404).json("Not found");
      res.status(200).json(foundProduct);
    } catch (error) {
      res.status(400).json("Failed");
    }
    return next();
  }

  public async getUserProducts(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const { page, keyword, sortBy, typeId, categoryId } = req.query;
      const {
        result,
        pageCount,
        hasNext
      } = await productService.getUserProducts(id, +page, {
        keyword,
        sortBy,
        typeId,
        categoryId
      });
      if (!result) return res.status(404).json("Not found");
      res.status(200).json({ result, pageCount, hasNext });
    } catch (error) {
      res.status(400).json("Failed");
    }

    return next();
  }
  public async updateProduct(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.body;
      const updatedProduct = await productService.updateProduct(id, req.body);
      if (!updatedProduct)
        return res.status(404).json("type or product not found!");
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(400).json("Failed");
    }

    return next();
  }

  public async deleteProduct(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const deletedProduct = await productService.deleteProduct(id);
      if (!deletedProduct) return res.status(404).json("Not found");
      return res.status(200).json(deletedProduct);
    } catch (error) {
      res.status(400).json("Failed");
    }
    return next();
  }
}
