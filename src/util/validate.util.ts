import {
    validationResult,
    ValidationChain,
    SanitizationChain,
    sanitizeBody,
} from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types/utils';

export const validate = (validations: (ValidationChain | SanitizationChain)[]) => {
    return async (req: AuthRequest, res: Response, next: NextFunction) => {
        await Promise.all(validations.map((validation) => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(422).json({ errors: errors.array() });
    };
};
