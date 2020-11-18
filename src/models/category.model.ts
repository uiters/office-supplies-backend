import { Document } from "mongoose";

export interface ICategory extends Document {
    categoryName: string;
    typeId: string;
}