import { IUser } from "../models/user.model";
import { Request } from "express";

export interface AuthRequest extends Request {
  user: IUser;
}

export interface IPopulate {
  path: string;
  select: string;
}