import { Document } from 'mongoose';
import { ProductModel } from '../mongoose/product.mongoose';
import { ICategory } from './category.model';

export enum PRODUCT_STATUS {
    OFFLINE = 0,
    ONLINE = 1,
}

export const PEN_COLOR = {
    BLUE: '#0953ad',
    RED: '#fa0c0c',
    BLACK: '#1d1717',
};

export interface IProduct extends Document {
    productName: string;
    userId: string;
    categoriesId: ICategory[];
    typeId: string;
    price: number;
    productDetails: any;
    status: PRODUCT_STATUS;
    description: string;
    productImage: string[];
    quantity: number;
    discount: number;
    ratePoints?: string;
}

export interface IProductProperties {
    productName: string;
    userId: string;
    categoriesId: ICategory[];
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

export interface IPEN extends IProductProperties {
    productDetails: {
        color: string[];
    };
}

interface IAbstractProductFactory {
    createBookProduct(): IAbstractBookProduct;
}

class ConcreteFactory implements IAbstractProductFactory {
    public createBookProduct(): IAbstractBookProduct {
        return new ConcreteBook();
    }

    public createPenProduct(): IAbstractPenProduct {
        return new ConcretePen();
    }
}

interface IAbstractBookProduct {
    createBook(data: IBook): IProduct;
}

interface IAbstractPenProduct {
    createBallPointPen(data: IPEN): IProduct;
    createPencil(data: IPEN): IProduct;
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
            status: 1,
            description: data.description,
            productImage: data.productImage,
            quantity: data.quantity,
            discount: data.discount,
        });

        return book;
    }
}

class ConcretePen implements IAbstractPenProduct {
    public createBallPointPen(data: IPEN): IProduct {
        const ballPointPen = new ProductModel({
            productName: data.productName,
            userId: data.userId,
            categoriesId: data.categoriesId,
            typeId: data.typeId,
            price: data.price,
            productDetails: {
                color: [PEN_COLOR.BLUE, PEN_COLOR.RED, PEN_COLOR.BLACK],
            },
            status: 0,
            description: data.description,
            productImage: data.productImage,
            quantity: data.quantity,
            discount: data.discount,
        });
        return ballPointPen;
    }
    public createPencil(data: IPEN): IProduct {
        const pencil = new ProductModel({
            productName: data.productName,
            userId: data.userId,
            categoriesId: data.categoriesId,
            typeId: data.typeId,
            price: data.price,
            productDetails: {
                color: [PEN_COLOR.BLACK],
            },
            status: 0,
            description: data.description,
            productImage: data.productImage,
            quantity: data.quantity,
            discount: data.discount,
        });
        return pencil;
    }
}

export function director(type: string, data: any, category?: string) {
    const factory = new ConcreteFactory();
    switch (type) {
        case 'book':
            return new ConcreteFactory().createBookProduct().createBook(data);
        case 'pen':
            if (category === 'pencil') {
                return factory.createPenProduct().createPencil(data);
            } else return factory.createPenProduct().createBallPointPen(data);
    }
}
