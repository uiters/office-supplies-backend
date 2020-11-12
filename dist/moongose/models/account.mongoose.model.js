"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const account_model_1 = require("../../models/account.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const accountSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    role: {
        required: true,
        type: Number,
        validate: {
            validator: (role) => {
                return Object.values(account_model_1.USER_ROLES).includes(role);
            }
        }
    }
}, { timestamps: true });
/**
 * Password hash middleware
 */
accountSchema.pre("save", function save(next) {
    const account = this;
    if (!account.isModified("password")) {
        return next();
    }
    bcrypt_1.default.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt_1.default.hash(account.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            account.password = hash;
            next();
        });
    });
});
// accountSchema.methods.comparePassword = function(
//   candidatePassword: string,
//   cb: any
// ) {
//   bcrypt.compare(
//     candidatePassword,
//     this.password,
//     (err: mongoose.Error, isMatch: boolean) => {
//       cb(err, isMatch);
//     }
//   );
// };
const comparePassword = function (candidatePassword, cb) {
    bcrypt_1.default.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};
accountSchema.methods = {
    createToken() {
        return jsonwebtoken_1.default.sign({ _id: this._id, role: this.role }, process.env.JWT_SECRET || "");
    },
    comparePassword
};
exports.AccountModel = mongoose_1.default.model("account", accountSchema);
