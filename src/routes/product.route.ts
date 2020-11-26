import express from "express";
import { authJwt } from "../config/passport";
import ProductController from "../controller/product.controller";
import { createProductValidate } from "../util/validatiors/product.validate";

const router = express.Router();
const productController = new ProductController();

// ** http://localhost:3000/api/product/?page=?&keyword=?&sortBy=?
router.get("/", productController.getProducts);
router.get("/product-id/:id", authJwt, productController.getProductById);

// ** http://localhost:3000/api/product/user-products/?page=?&keyword=?&sortBy=?
router.get("/user-products", authJwt, productController.getUserProducts);

router.post(
  "/",
  authJwt,
  createProductValidate,
  productController.createProduct
);
router.put("/", authJwt, productController.updateProduct);

router.delete("/:id", authJwt, productController.deleteProduct);

export default router;
