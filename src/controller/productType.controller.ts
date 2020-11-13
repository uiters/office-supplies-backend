import { NextFunction, Response } from 'express';
import { ProductTypeModel } from '../mongoose/productType.mongoose';
import ProductTypeService from '../service/productType.serivce';
import { AuthRequest } from '../types/utils';

const productTypeService = new ProductTypeService();
export default class ProductTypeController {
    public async createType(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { typeName } = req.body;
            const newType = await productTypeService.createType(typeName);
            newType.save((err) => {
                if (err) res.status(400).json('Failed');
                res.status(201).json(newType);
            });
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
            const { id } = req.body;
            const updatedType = await productTypeService.deleteType(id);
            if (!updatedType) return res.status(400).json('Not found');
            res.status(200).json({ updatedType });
        } catch (error) {
            res.status(400).json('Failed');
        }
        return next();
    }
}
