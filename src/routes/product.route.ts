import express from 'express';
import { authJwt } from '../config/passport';
import ProductController from '../controller/product.controller';
import { isAdmin } from '../util/permission.util';
import { createProductValidate } from '../util/validatiors/product.validate';

const router = express.Router();
const productController = new ProductController();

// ** http://localhost:3000/api/product/?page=?&keyword=?&sortBy=?&typeId=?&categoryId=?
router.get('/', productController.getProducts);
router.get('/product-admin', authJwt, productController.adminGetProducts);

router.get('/product-id/:id', authJwt, productController.getProductById);

// ** http://localhost:3000/api/product/user-products/:id?page=?&keyword=?&sortBy=?&typeId=?&categoryId
router.get('/user-products/:id', authJwt, productController.getUserProducts);

router.post('/', authJwt, createProductValidate, productController.createProduct);
router.put('/', authJwt, productController.updateProduct);

router.delete('/:id', authJwt, productController.deleteProduct);

export default router;
