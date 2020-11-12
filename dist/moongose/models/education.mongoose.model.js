"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EducationModel = exports.educationSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.educationSchema = new mongoose_1.default.Schema({
    educationName: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });
exports.EducationModel = mongoose_1.default.model("education", exports.educationSchema);
