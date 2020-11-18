import { UserModel } from '../../mongoose/user.mongoose';
import { check, body } from 'express-validator';
import { validate } from '../validate.util';

export const createUserValidators = validate([
    check('email').isEmail().not().isEmpty(),
    check('email').custom((email) => {
        return UserModel.findOne({ email }).then((user) => {
            if (user) return Promise.reject('email already existed');
        });
    }),
    check('password').isLength({ min: 6 }),
]);

export const editUserValidators = validate([
    check('password').isLength({ min: 6 }).not().isEmpty(),
]);
