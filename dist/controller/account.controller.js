"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const account_mongoose_model_1 = require("../moongose/models/account.mongoose.model");
class AccountController {
    createAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, role } = req.body;
            const newAccount = new account_mongoose_model_1.AccountModel({
                username,
                password,
                role
            });
            yield newAccount.save(err => {
                if (err)
                    return next(err);
                res.status(201).json(newAccount);
            });
        });
    }
    deleteAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // TODO: check user role before delete department
                const foundAccount = yield account_mongoose_model_1.AccountModel.findById(req.body.id);
                if (!foundAccount)
                    return res.status(400).send("Department not found");
                const deletedAccount = yield account_mongoose_model_1.AccountModel.findByIdAndDelete(foundAccount._id);
                if (!deletedAccount)
                    return res.status(400).send("Failed");
                res.status(200).json(deletedAccount);
            }
            catch (error) {
                res.status(400).send("failed");
            }
            return next();
        });
    }
    postLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const account = yield account_mongoose_model_1.AccountModel.findOne({
                    username: req.body.username
                });
                if (!account) {
                    return res.status(400).send("Failed");
                }
                const token = account.createToken();
                res.status(200).send(`Bearer ${token}`);
            }
            catch (error) {
                res.status(400).send("Failed");
            }
            return next();
        });
    }
}
exports.AccountController = AccountController;
