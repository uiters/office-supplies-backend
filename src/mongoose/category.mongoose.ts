import mongoose from 'mongoose';
import { ICategory } from '../models/category.model';

const categorySchema = new mongoose.Schema({
    typeId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'producttype',
    },
    categoryName: {
        type: String,
        required: true,
    },
});

export const CategoryModel = mongoose.model<ICategory>('category', categorySchema);
