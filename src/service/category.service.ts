import { CategoryModel } from '../mongoose/category.mongoose';

export default class CategoryService {
    public async createCategory(typeId: string, categoryName: string) {
        const newCategory = new CategoryModel({
            typeId,
            categoryName,
        });
        const doc = await newCategory.save();
        return doc;
    }

    public async getCategories() {
        const foundCategories = await CategoryModel.find()
            .populate('typeId', 'typeName')
            .sort({ categoryName: 1 });
        return foundCategories;
    }

    public async updateCategory(id: string, categoryName: string) {
        const foundCategory = await CategoryModel.findOne({ _id: id });
        if (!foundCategory) return null;
        foundCategory.categoryName = categoryName;
        const updatedCategory = await foundCategory.save();
        return updatedCategory;
    }

    public async getCategoriesByType(typeId: string) {
        const foundCategories = await CategoryModel.find({ typeId }).sort({ categoryName: 1 });
        return foundCategories;
    }

    public async getCategoryById(id: string) {
        const foundCategory = await CategoryModel.findById(id);
        return foundCategory;
    }

    public async deleteCategory(id: string) {
        const deletedCategory = await CategoryModel.findByIdAndDelete(id);
        return deletedCategory;
    }
}
