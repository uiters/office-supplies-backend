import { PAGINATE } from '../constants/paginate.const';
import { director, IBook } from '../models/product.model';
import { ProductModel } from '../mongoose/product.mongoose';
import { ProductTypeModel } from '../mongoose/productType.mongoose';

export default class ProductService {
    public async createProduct(data: any) {
        const type = await ProductTypeModel.findById(data.typeId);
        if (!type) return null;
        const newProduct = director(type.typeName, data);
        const doc = await newProduct.save();

        return doc;
    }

    public async getProduct(page: number = 1, queryParams: IQueryOptions) {
        const skip = (page - 1) * PAGINATE.PAGE_SIZE;
        const { sortBy, keyword } = queryParams;
        const products = await ProductModel.find({
            productName: new RegExp(keyword, 'i'),
        })
            .skip(skip)
            .limit(PAGINATE.PAGE_SIZE)
            .populate('typeId', '-_id typeName')
            .populate('userId', '-_id email')
            .populate('categoriesId')
            .sort(`${sortBy}`);
        const pageCount = Math.ceil((await ProductModel.countDocuments()) / PAGINATE.PAGE_SIZE);
        const hasNext = page < pageCount;

        return {
            products,
            pageCount,
            hasNext,
        };
    }

    public async getUserProducts(userId: string, page: number = 1, queryParams: IQueryOptions) {
        const skip = (page - 1) * PAGINATE.PAGE_SIZE;
        const { sortBy, keyword } = queryParams;
        console.log(sortBy, "<==== sortBy")
        const products = await ProductModel.find({
            $and: [{ userId: userId }, { productName: new RegExp(keyword, 'i') }],
        })
            .skip(skip)
            .limit(PAGINATE.PAGE_SIZE)
            .populate('typeId', '-_id typeName')
            .populate('userId', '-_id email')
            .populate('categoriesId')
            .sort(`${sortBy}`);
        const pageCount = Math.ceil((await ProductModel.countDocuments()) / PAGINATE.PAGE_SIZE);
        const hasNext = page < pageCount;

        return {
            products,
            pageCount,
            hasNext,
        };
    }

    public async updateProduct(id: string, data: IBook) {
        const foundProduct = await ProductModel.findById(id);
        if (!foundProduct) return null;
        if (data.productName !== undefined) foundProduct.productName = data.productName;
        if (data.categoriesId !== undefined) foundProduct.categoriesId = data.categoriesId;
        if (data.typeId !== undefined) foundProduct.typeId = data.typeId;
        if (data.price !== undefined) foundProduct.price = data.price;
        if (data.status !== undefined) foundProduct.status = data.status;
        if (data.description !== undefined) foundProduct.description = data.description;
        if (data.productImage !== undefined) foundProduct.productImage = data.productImage;
        if (data.quantity !== undefined) foundProduct.quantity = data.quantity;
        if (data.discount !== undefined) foundProduct.discount = data.discount;

        const updatedProduct = foundProduct
            .save()
            .then((product) =>
                product
                    .populate('typeId', '-_id typeName')
                    .populate('userId', '-_id email')
                    .populate('categoriesId')
                    .execPopulate()
            );
        return updatedProduct;
    }

    public async deleteProduct(id: string) {
        const deletedProduct = await ProductModel.findByIdAndDelete(id);
        return deletedProduct;
    }

    public async getProductById(id: string) {
        const foundProduct = await ProductModel.findById(id)
            .populate('typeId', '-_id typeName')
            .populate('userId', '-_id email')
            .populate('categoriesId');

        return foundProduct;
    }
}

interface IQueryOptions {
    keyword?: string;
    sortBy?: SORT_BY;
}

enum SORT_BY {
    PRODUCT_NAME = 'productName',
    PRICE = 'price',
}

// productName: new RegExp(req.query.keyword, "i")
