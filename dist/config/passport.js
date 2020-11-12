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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = exports.authJwt = exports.authLocal = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const account_mongoose_model_1 = require("../moongose/models/account.mongoose.model");
const LocalStrategy = passport_local_1.default.Strategy;
passport_1.default.serializeUser(function (account, done) {
    done(null, account._id);
});
passport_1.default.deserializeUser((id, done) => {
    account_mongoose_model_1.AccountModel.findById(id, (err, account) => {
        done(err, account);
    });
});
passport_1.default.use(new LocalStrategy(function (username, password, done) {
    account_mongoose_model_1.AccountModel.findOne({ username }, (err, account) => {
        if (err) {
            return done(err);
        }
        if (!account) {
            return done(undefined, false, {
                message: `Username: ${username} not found`
            });
        }
        account.comparePassword(password, (err, isMatch) => {
            if (err) {
                return done(err);
            }
            if (isMatch) {
                return done(undefined, account);
            }
            return done(undefined, false, { message: "Invalid email or password" });
        });
    });
}));
const JwtStrategy = passport_jwt_1.default.Strategy;
const ExtractJwt = passport_jwt_1.default.ExtractJwt;
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "JWT_SECRET"
};
passport_1.default.use(new JwtStrategy(jwtOptions, function (payload, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const account = yield account_mongoose_model_1.AccountModel.findById(payload._id);
            if (!account) {
                return done(null, false);
            }
            return done(null, account);
        }
        catch (error) {
            return done(error, false);
        }
    });
}));
exports.authLocal = passport_1.default.authenticate("local", { session: false });
exports.authJwt = passport_1.default.authenticate("jwt", { session: false });
exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(400).send("Have to login");
};
