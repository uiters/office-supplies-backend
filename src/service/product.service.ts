import { PAGINATE } from '../constants/paginate.const';
import { director, IBook, IProduct } from '../models/product.model';
import { ProductModel } from '../mongoose/product.mongoose';
import { ProductTypeModel } from '../mongoose/productType.mongoose';
import RatingService from './rating.service';

const ratingService = new RatingService();
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
        const { sortBy, keyword, typeId } = queryParams;

        let query: any[] = [{ productName: new RegExp(keyword, 'i') }];

        if (typeId) query.push({ typeId });

        let products = await ProductModel.find({
            $and: query,
        })
            .skip(skip)
            .limit(PAGINATE.PAGE_SIZE)
            .sort(`${sortBy}`)
            .where('status')
            .equals(1);
        const pageCount = Math.ceil((await ProductModel.countDocuments()) / PAGINATE.PAGE_SIZE);
        const hasNext = page < pageCount;

        let result = await Promise.all(
            products.map((prod) => {
                return this._updateRatePoints(prod._id);
            })
        );

        return {
            result,
            pageCount,
            hasNext,
        };
    }

    private async _updateRatePoints(productId: string) {
        const foundProduct = await ProductModel.findById(productId);
        if (!foundProduct) return null;
        foundProduct.ratePoints = await ratingService.calculateRating(foundProduct._id);
        if (isNaN(+foundProduct.ratePoints)) {
            foundProduct.ratePoints = '0';
        }
        const updatedProduct = await foundProduct
            .save()
            .then((prod) =>
                prod
                    .populate('typeId', '-_id typeName')
                    .populate('userId', '-_id email')
                    .populate('categoriesId')
                    .populate('getComments', '-_id comment userId')
                    .execPopulate()
            );
        return updatedProduct;
    }

    public async getUserProducts(userId: string, page: number = 1, queryParams: IQueryOptions) {
        const skip = (page - 1) * PAGINATE.PAGE_SIZE;
        const { sortBy, keyword } = queryParams;
        const products = await ProductModel.find({
            $and: [{ userId: userId }, { productName: new RegExp(keyword, 'i') }],
        })
            .skip(skip)
            .limit(PAGINATE.PAGE_SIZE)
            .sort(`${sortBy}`)
            .where('status')
            .equals(0); //! change to one after test
        const pageCount = Math.ceil((await ProductModel.countDocuments()) / PAGINATE.PAGE_SIZE);
        const hasNext = page < pageCount;
        let result = await Promise.all(
            products.map((prod) => {
                return this._updateRatePoints(prod._id);
            })
        );
        return {
            result,
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
            .populate('categoriesId')
            .populate('getComments', '-_id -productId comment userId');

        const result = this._updateRatePoints(foundProduct._id);

        return result;
    }
}

interface IQueryOptions {
    keyword?: any;
    sortBy?: any;
    typeId?: any;
}

// productName: new RegExp(req.query.keyword, "i")
