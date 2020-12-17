import { NextFunction, Response } from 'express';
import { AuthService } from '../service/auth.service';
import { AuthRequest } from '../types/utils';

const authService = new AuthService();
export default class AuthController {
    async postLogin(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { username } = req.body;
            const token = await authService.login(username);
            if(!token) return res.status(400).json("Not Found");
            res.status(200).json(`Bearer ${token}`);
        } catch (error) {
            res.status(400).json('Failed');
        }
        return next();
    }
}
