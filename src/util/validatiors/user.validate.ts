import { check, body } from 'express-validator';
import { validate } from '../validate.util';

export const createUserValidators = validate([
    check('email').isEmail().not().isEmpty(),
    check('password').isLength({ min: 6 }),  
]);

export const editUserValidators = validate([
    check('password').isLength({ min: 6 }).not().isEmpty(),  
]);
