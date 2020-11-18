import { Document } from 'mongoose';
import { ProductModel } from '../mongoose/product.mongoose';

export enum PRODUCT_STATUS {
    OFFLINE = 0,
    ONLINE = 1,
}
export interface IProduct extends Document {
    productName: string;
    userId: string;
    categoriesId: string[];
    typeId: string;
    price: number;
    productDetails: any;
    status: PRODUCT_STATUS;
    description: string;
    productImage: string[];
    quantity: number;
    discount: number;
}

export interface IProductProperties {
    productName: string;
    userId: string;
    categoriesId: string[];
    typeId: string;
    price: number;
    status: PRODUCT_STATUS;
    description: string;
    productImage: string[];
    quantity: number;
    discount: number;
}

export interface IBook extends IProductProperties {
    productDetails: {
        author: string;
        pageNumber?: number;
        publishedDate?: Date;
        cover: string;
    };
}

interface IAbstractProductFactory {
    createBookProduct(): IAbstractBookProduct;
}

class ConcreteFactory implements IAbstractProductFactory {
    public createBookProduct(): IAbstractBookProduct {
        return new ConcreteBook();
    }
}

interface IAbstractBookProduct {
    createBook(data: IBook): IProduct;
}

class ConcreteBook implements IAbstractBookProduct {
    public createBook(data: IBook): IProduct {
        const book = new ProductModel({
            productName: data.productName,
            userId: data.userId,
            categoriesId: data.categoriesId,
            typeId: data.typeId,
            price: data.price,
            productDetails: data.productDetails,
            status: 0,
            description: data.description,
            productImage: data.productImage,
            quantity: data.quantity,
            discount: data.discount,
        });

        return book;
    }
}

export function director(type: string, data: any) {
    switch (type) {
        case 'book':
            return new ConcreteFactory().createBookProduct().createBook(data);
    }
}