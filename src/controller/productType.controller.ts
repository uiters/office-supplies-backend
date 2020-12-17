import { NextFunction, Response } from 'express';
import ProductTypeService from '../service/productType.service';
import { AuthRequest } from '../types/utils';

const productTypeService = new ProductTypeService();
export default class ProductTypeController {
    public async createType(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { typeName } = req.body;
            const newType = await productTypeService.createType(typeName.toLowerCase());
            if (!newType) return res.status(400).json('Failed');
            res.status(200).json(newType);
        } catch (error) {
            res.status(400).json('Failed');
        }

        return next();
    }

    public async getType(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { page } = req.query;
            const { productType, pageCount, hasNext } = await productTypeService.getType(+page);
            if (!productType) return res.status(400).json('Failed');
            res.status(200).json({ productType, pageCount, hasNext });
        } catch (error) {
            res.status(400).json('Failed');
        }
        return next();
    }

    public async deleteType(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const deletedType = await productTypeService.deleteType(id);
            if (!deletedType) return res.status(400).json('Not found');
            res.status(200).json({ deletedType });
        } catch (error) {
            res.status(400).json('Failed');
        }
        return next();
    }

    public async updateType(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id, typeName } = req.body;
            const updatedType = await productTypeService.updateType(id, typeName);
            if (!updatedType) return res.status(400).json('Not found');
            res.status(200).json(updatedType);
        } catch (error) {
            res.status(400).json('Failed');
        }
        return next();
    }
}
