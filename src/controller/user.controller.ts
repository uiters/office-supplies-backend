import { NextFunction, Request, Response } from 'express';
import UserService from '../service/user.service';
import { AuthRequest } from '../types/utils';
import crypto from 'crypto';

const userService = new UserService();
export class UserController {
    public async createUser(req: AuthRequest, res: Response, next: NextFunction) {
        // TODO: SEND EMAIL VERIFICATION
        try {
            const { email, password, profile, status, isAdmin } = req.body;

            const emailToken = crypto.randomBytes(64).toString('hex');

            const newUser = {
                email,
                password,
                emailVerifiedToken: emailToken,
                profile,
                status: status | 0,
                isAdmin: isAdmin || false,
            };
            const result = await userService.createUser(newUser, undefined, req);
            if (result) res.status(201).json('Check your email to activate your account');
        } catch (error) {
            res.status(400).json('Failed');
        }
        return next();
    }

    public async getMe(req: AuthRequest, res: Response, next: NextFunction) {
        // TODO: POPULATE PRODUCT
        try {
            const id = req.user._id;
            const user = await userService.getMe(id);
            if (!user) return res.status(404).json('Not found');
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json('Failed');
        }

        return next();
    }

    public async getUser(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { page } = req.query;
            const { user, pageCount, hasNext } = await userService.getUser(+page);
            if (!user) return res.status(400).json('Failed');
            res.status(200).json({ user, pageCount, hasNext });
        } catch (error) {
            res.status(400).json('Failed');
        }
        return next();
    }

    public async deleteUser(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const id = req.user._id;
            const result = await userService.deleteUser(id);
            if (!result) return res.status(404).json('Not found');
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json('Failed');
        }
        return next();
    }

    // !NOTICE: Front-end only allow user to modify password and profile
    public async updateUser(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id, password, profile, status } = req.body;
            const updatedUser = await userService.updateUser(id, { password, profile, status });
            if (updatedUser === null) return res.status(404).json('Not Found');
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(400).json('Failed');
        }

        return next();
    }

    public async getUserById(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            // TODO: POPULATE PRODUCT
            const { id } = req.params;
            const user = await userService.getUserById(id);
            if (!user) return res.status(404).json('Not Found');
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json('Failed');
        }
        return next();
    }

    public async verifyUser(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const emailToken = req.params.token;
            const result = await userService.verifyUser(emailToken);
            if (!result) return res.status(404).json('Not found');
            res.status(200).json('User has been activated');
        } catch (error) {
            res.status(400).json('Failed');
        }
        return next();
    }

    public async forgotPassword(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const result = await userService.forgotPassword(req.body.email, req);
            if (!result) {
                return res.status(400).json('Not found');
            }
            res.status(200).json('Please check your email and follow the instruction');
        } catch (error) {
            res.status(400).json('Failed');
        }
        return next();
    }

    public async resetPassword(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const result = await userService.resetPassword(req.params.token);
            if (!result) {
                return res.status(400).json('Not found');
            }
            res.status(200).json('Please check your email');
        } catch (error) {
            res.status(400).json('Failed');
        }
        return next();
    }
}
