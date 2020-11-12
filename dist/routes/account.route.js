"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const account_controller_1 = require("../controller/account.controller");
const passport_1 = require("../config/passport");
const account_validator_1 = require("../util/validatiors/account.validator");
const router = express_1.default.Router();
const accountController = new account_controller_1.AccountController();
router.post("/create", passport_1.authJwt, account_validator_1.createAccountValidators, accountController.createAccount);
router.post("/login", passport_1.authLocal, accountController.postLogin);
// router.get("/", AccountController.getAllDepartments);
// router.get("/:id", AccountController.getDepartmentById);
// router.put("/", AccountController.editDepartment);
// router.delete("/", AccountController.deleteDepartment);
exports.default = router;
