import { check, body } from 'express-validator';
import { validate } from '../validate.util';

export const typeValidate = validate([
    check('typeName').not().isEmpty(),
]);
