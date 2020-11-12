"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccountValidators = void 0;
const express_validator_1 = require("express-validator");
const validate_util_1 = require("../validate.util");
const account_mongoose_model_1 = require("../../moongose/models/account.mongoose.model");
const account_model_1 = require("../../models/account.model");
exports.createAccountValidators = validate_util_1.validate([
    express_validator_1.check("username").custom(value => {
        return account_mongoose_model_1.AccountModel.findOne({ username: value }).then(account => {
            if (account)
                return Promise.reject("username already in use");
        });
    }),
    express_validator_1.check("password").isLength({ min: 6 }),
    express_validator_1.check("role").custom(value => {
        if (!Object.values(account_model_1.USER_ROLES).includes(value)) {
            return Promise.reject("invalid Role");
        }
        return Promise.resolve();
    })
]);
