import { NextFunction, Request, Response } from 'express';
import CategoryService from '../service/category.service';
import { AuthRequest } from '../types/utils';

const categoryService = new CategoryService();
export default class CategoryController {
    public async createCategory(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { typeId, categoryName } = req.body;
            const newCategory = await categoryService.createCategory(typeId, categoryName);
            res.status(201).json(newCategory);
        } catch (error) {
            res.status(400).json('Failed');
        }
        return next();
    }
    public async getCategories(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const foundCategories = await categoryService.getCategories();
            if (!foundCategories) return res.status(404).json('Not found');
            res.status(200).json(foundCategories);
        } catch (error) {
            res.status(400).json('Failed');
        }

        return next();
    }

    public async getCategoryById(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const foundCategory = await categoryService.getCategoryById(id);
            if (!foundCategory) return res.status(404).json('Not found');
            res.status(200).json(foundCategory);
        } catch (error) {
            res.status(400).json('Failed');
        }
        return next();
    }
    public async updateCategory(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id, categoryName } = req.body;
            const updatedCategory = await categoryService.updateCategory(id, categoryName);
            if (!updatedCategory) return res.status(404).json('Not found');
            res.status(200).json(updatedCategory);
        } catch (error) {
            res.status(400).json('Failed');
        }

        return next();
    }

    public async getCategoriesByType(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { typeId } = req.body;
            const foundCategories = await categoryService.getCategoriesByType(typeId);
            if (!foundCategories) return res.status(404).json('Not found');
            res.status(200).json(foundCategories);
        } catch (error) {
            res.status(400).json('Not found');
        }

        return next();
    }

    public async deleteCategory(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const deletedCategory = await categoryService.deleteCategory(id);
            if (!deletedCategory) res.status(404).json('Not found');
            res.status(200).json(deletedCategory);
        } catch (error) {
            res.status(400).json('Not found');
        }
        return next();
    }
}
