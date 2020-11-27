import mongoose from 'mongoose';
import { IProduct, PRODUCT_STATUS } from '../models/product.model';

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'user',
        },
        categoriesId: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'category',
            },
        ],
        typeId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'producttype',
        },
        price: {
            type: Number,
            required: true,
        },
        productDetails: Object,
        status: {
            type: Number,
            validate: {
                validator: (value: PRODUCT_STATUS) => {
                    return Object.values(PRODUCT_STATUS).includes(value);
                },
            },
        },
        description: String,
        productImage: [
            {
                type: String,
                required: true,
            },
        ],
        quantity: {
            type: Number,
            required: true,
        },
        discount: Number,
        ratePoints: String,
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

productSchema.virtual('getComments', {
    ref: 'comment',
    localField: '_id',
    foreignField: 'productId',
});

export const ProductModel = mongoose.model<IProduct>('product', productSchema);
