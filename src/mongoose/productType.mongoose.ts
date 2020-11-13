import mongoose from 'mongoose';
import { IProductType } from '../models/productType.model';

const productTypeSchema = new mongoose.Schema(
    {
        typeName: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const ProductTypeModel = mongoose.model<IProductType>('producttype', productTypeSchema);
