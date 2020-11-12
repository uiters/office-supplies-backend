"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const employee_model_1 = require("../../models/employee.model");
const Schema = mongoose_1.default.Schema;
const employeeSchema = new Schema({
    name: String,
    fullName: {
        type: String,
        required: [true, "full name is required"]
    },
    avatarUrl: {
        type: String,
        required: [true, "avatar is required"]
    },
    gender: {
        type: String,
        validate: {
            validator: (gender) => {
                return Object.values(employee_model_1.eGender).includes(gender);
            }
        }
    },
    birthPlace: {
        type: String,
        required: [true, "birth place is required"]
    },
    birthDay: {
        type: Date,
        required: [true, "birth day is required"]
    },
    // TODO: add education ID ref
    educationId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "education",
        required: true
    },
    identityNumber: {
        type: String,
        required: true
    },
    // TODO: add deparment ID ref
    departmentId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "department",
        required: true
    },
    // TODO: add position ID ref
    positionId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "position",
        required: true
    },
    address: {
        type: String,
        required: true
    },
    homeTown: String,
    phoneNumber: {
        type: String,
        required: true
    },
    joinDate: {
        type: Date,
        required: true
    },
    contractExpirationDate: {
        type: Date,
        required: true
    },
    note: String,
    email: {
        type: String,
        required: true
    }
}, { timestamps: true });
// employeeSchema.methods.removeDepartmentFromUser = async function(deparmentId: string) {
//     return this.model(EmployeeModel).findByIdAndUpdate(
//       this._id,
//       { $pullAll: { users: [userId] } },
//       { new: true }
//     );
//   };
exports.EmployeeModel = mongoose_1.default.model("employee", employeeSchema);
