import { check } from 'express-validator';
import { validate } from '../validate.util';
import _ from 'lodash';
export const createCommentValidate = validate([
    check('comment').custom((value: string) => {
        if (value.length >= 100) {
            return Promise.reject('Comment too long (<= 100 words)');
        }
        return Promise.resolve(value);
    }),
]);
