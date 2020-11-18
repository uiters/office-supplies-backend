import { PAGINATE } from '../constants/paginate.const';
import { ProductTypeModel } from '../mongoose/productType.mongoose';

export default class ProductTypeService {
    public async createType(typeName: string) {
        const newType = new ProductTypeModel({
            typeName,
        });
        const doc = await newType.save();
        return doc;
    }

    public async getType(page: number = 1) {
        const skip = (page - 1) * PAGINATE.PAGE_SIZE;
        const productType = await ProductTypeModel.find()
            .skip(skip)
            .limit(PAGINATE.PAGE_SIZE)
            .populate('categories');
        const pageCount = Math.ceil((await ProductTypeModel.countDocuments()) / PAGINATE.PAGE_SIZE);
        const hasNext = page < pageCount;
        return {
            productType,
            pageCount,
            hasNext,
        };
    }

    public async deleteType(id: string) {
        const deletedType = await ProductTypeModel.findByIdAndDelete(id);
        if (!deletedType) return null;
        return deletedType;
    }

    public async updateType(id: string, typeName: string) {
        const foundType = await ProductTypeModel.findById(id);
        foundType.typeName = typeName;
        const updatedType = await foundType.save();
        return updatedType;
    }
}
