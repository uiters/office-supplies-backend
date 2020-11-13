import { Document } from "mongoose";

export interface IProductType extends Document {
    typeName: string;
}