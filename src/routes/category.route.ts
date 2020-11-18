import express from 'express';
import { authJwt } from '../config/passport';
import CategoryController from '../controller/category.controller';
import { isAdmin } from '../util/permission.util';
import {
    createCategoryValidate,
    updateCategoryValidate,
} from '../util/validatiors/category.validate';

const router = express.Router();

const categoryController = new CategoryController();

router.get('/', authJwt, categoryController.getCategories);
router.get('/:id', authJwt, categoryController.getCategoryById);

router.put('/', authJwt, isAdmin, updateCategoryValidate, categoryController.updateCategory);
router.post('/', authJwt, isAdmin, createCategoryValidate, categoryController.createCategory);

router.patch('/', authJwt, categoryController.getCategoriesByType);
router.delete('/:id', authJwt, isAdmin, categoryController.deleteCategory);
export default router;
