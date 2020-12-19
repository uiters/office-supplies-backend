import { PAGINATE } from '../constants/paginate.const';
import { director, IBook, IProduct } from '../models/product.model';
import { ProductModel } from '../mongoose/product.mongoose';
import { ProductTypeModel } from '../mongoose/productType.mongoose';
import RatingService from './rating.service';
import { CategoryModel } from '../mongoose/category.mongoose';
import { AuthRequest } from '../types/utils';

const ratingService = new RatingService();
export default class ProductService {
    public async createProduct(data: any) {
        const type = await ProductTypeModel.findById(data.typeId);
        if (!type) return null;
        const category = data.categoriesId
            ? await CategoryModel.findById(data.categoriesId[0])
            : null;
        const newProduct = director(
            type.typeName,
            data,
            category ? category.categoryName.toLowerCase() : null
        );
        const doc = await newProduct.save();
        return doc;
    }

    public async getProduct(page: number = 1, queryParams: IQueryOptions, req: AuthRequest) {
        const skip = (page - 1) * PAGINATE.PAGE_SIZE;
        const { sortBy, keyword, typeId, categoryId } = queryParams;

        let query: any[] = [{ productName: new RegExp(keyword, 'i') }];

        if (typeId) query.push({ typeId });

        let products = await ProductModel.find({
            $and: query,
        })
            .skip(skip)
            .limit(PAGINATE.PAGE_SIZE)
            .sort(`${sortBy}`)
            .where('status')
            .equals(1); //! change to one after test

        const pageCount = Math.ceil((await ProductModel.countDocuments()) / PAGINATE.PAGE_SIZE);
        const hasNext = page < pageCount;

        if (categoryId) products = this._filterProductByCategory(products, categoryId);

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
                    .populate('userId', '_id email')
                    .populate('categoriesId')
                    .populate('getComments', '-_id comment userId')
                    .execPopulate()
            );
        return updatedProduct;
    }

    private _filterProductByCategory(products: IProduct[], categoryId: string) {
        return products.filter((prod) => prod.categoriesId[0]._id == categoryId);
    }

    public async getUserProducts(userId: string, page: number = 1, queryParams: IQueryOptions) {
        const skip = (page - 1) * PAGINATE.PAGE_SIZE;

        const { sortBy, keyword, typeId, categoryId } = queryParams;

        const query: any[] = [{ userId: userId }, { productName: new RegExp(keyword, 'i') }];

        if (typeId) query.push({ typeId });
        // if (categoryId) query.push({ categoriesId[0]: categoryId });

        console.log(query);

        let products = await ProductModel.find({
            $and: query,
        })
            .skip(skip)
            .limit(PAGINATE.PAGE_SIZE)
            .sort(`${sortBy}`)
            .where('status')
            .equals(0); //! change to one after test

        if (categoryId) products = this._filterProductByCategory(products, categoryId);

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
        if (data.productDetails !== undefined) foundProduct.productDetails = data.productDetails;

        const updatedProduct = foundProduct
            .save()
            .then((product) =>
                product
                    .populate('typeId', '-_id typeName')
                    .populate('userId', '_id email')
                    .populate('categoriesId')
                    .populate('getComments', '-_id comment userId')
                    .execPopulate()
            );
        return updatedProduct;
    }

    public async deleteProduct(id: string) {
        const deletedProduct = await ProductModel.findByIdAndDelete(id);
        return deletedProduct;
    }

    public async getProductById(id: string) {
        const foundProduct = await ProductModel.findById(id);

        const result = this._updateRatePoints(foundProduct._id);

        return result;
    }

    public async adminGetProducts(page: number = 1, queryParams: IQueryOptions) {
        const skip = (page - 1) * PAGINATE.PAGE_SIZE;
        const { sortBy, keyword, typeId, categoryId } = queryParams;

        let query: any[] = [{ productName: new RegExp(keyword, 'i') }];

        if (typeId) query.push({ typeId });

        let products = await ProductModel.find({
            $and: query,
        })
            .skip(skip)
            .limit(PAGINATE.PAGE_SIZE)
            .sort(`${sortBy}`)
            .where('status');

        const pageCount = Math.ceil((await ProductModel.countDocuments()) / PAGINATE.PAGE_SIZE);
        const hasNext = page < pageCount;

        if (categoryId) products = this._filterProductByCategory(products, categoryId);

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
}

interface IQueryOptions {
    keyword?: any;
    sortBy?: any;
    typeId?: any;
    categoryId?: any;
}

// productName: new RegExp(req.query.keyword, "i")
