import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../mongoose/user.mongoose';
import { AuthRequest } from '../types/utils';

export const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { isAdmin } = req.user;
    if (isAdmin) {
        next();
    } else return res.status(401).json('You don not have permisson to access the API');
};

export const isActivate = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = await UserModel.findById(req.user._id);
    if (user.status === 1) {
        next();
    } else return res.status(401).json('Check your email to activate your account');
};
