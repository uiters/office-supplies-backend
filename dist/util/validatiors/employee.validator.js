"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editEmployeeValidators = exports.createEmployeeValidators = void 0;
const express_validator_1 = require("express-validator");
const validate_util_1 = require("../validate.util");
exports.createEmployeeValidators = validate_util_1.validate([
    express_validator_1.check("name")
        .trim()
        .escape(),
    express_validator_1.check("fullName")
        .trim()
        .escape(),
    express_validator_1.check("avatarUrl")
        .isString()
        .not()
        .isEmpty(),
    express_validator_1.check("phoneNumber").isLength({ min: 10 }),
    express_validator_1.check("identityNumber").isLength({ min: 9 }),
    express_validator_1.check("email")
        .isEmail()
        .not()
        .isEmpty()
]);
exports.editEmployeeValidators = validate_util_1.validate([
    express_validator_1.check("phoneNumber").isLength({ min: 10 }),
    express_validator_1.check("identityNumber").isLength({ min: 9 })
]);
