import { check, body } from 'express-validator';
import { validate } from '../validate.util';

export const createProductValidate = validate([
    check('productName').not().isEmpty(),
    check('typeId').not().isEmpty(),
    check('price').not().isEmpty(),
    check('productImage').not().isEmpty(),
    // check('categoriesId').not().isEmpty()
]);
