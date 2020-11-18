import mongoose from 'mongoose';
import { IProductType } from '../models/productType.model';

const productTypeSchema = new mongoose.Schema(
    {
        typeName: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { toJSON: { virtuals: true }, timestamps: true }
);

productTypeSchema.virtual('categories', {
    ref: 'category',
    localField: '_id',
    foreignField: 'typeId',
    option: { sort: { categoryName: 1 } },
});

export const ProductTypeModel = mongoose.model<IProductType>('producttype', productTypeSchema);
