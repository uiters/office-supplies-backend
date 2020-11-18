import { check, body } from 'express-validator';
import { validate } from '../validate.util';

export const createCategoryValidate = validate([
    check('categoryName').not().isEmpty(),
    check('typeId').not().isEmpty(),
]);

export const updateCategoryValidate = validate([
    check('id').not().isEmpty(),
    check('categoryName').not().isEmpty(),
]);
