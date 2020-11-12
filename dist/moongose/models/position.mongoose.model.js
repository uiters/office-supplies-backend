"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostionModel = exports.positionSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.positionSchema = new mongoose_1.default.Schema({
    positionName: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });
exports.PostionModel = mongoose_1.default.model("position", exports.positionSchema);
