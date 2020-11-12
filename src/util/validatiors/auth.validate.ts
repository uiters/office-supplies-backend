import { check, body } from 'express-validator';
import { validate } from '../validate.util';

export const loginValidate = validate([
    check('email').isEmail().not().isEmpty(),
    check('password').not().isEmpty(),
]);
