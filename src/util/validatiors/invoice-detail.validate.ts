import { check } from 'express-validator';
import { validate } from '../validate.util';
import _ from 'lodash'
export const createInvoiceDetailValidate = validate([
    check('total').not().isEmpty(),
    check('address').custom(value => {
        if(_.isEmpty(value)){
            return Promise.reject('Please adding your address')
        }
    }),
]);

