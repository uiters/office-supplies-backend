"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentModel = exports.departmentSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.departmentSchema = new mongoose_1.default.Schema({
    departmentName: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });
exports.DepartmentModel = mongoose_1.default.model("department", exports.departmentSchema);
