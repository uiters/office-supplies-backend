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
exports.EmployeeController = void 0;
const employee_mongoose_model_1 = require("../moongose/models/employee.mongoose.model");
const department_mongoose_model_1 = require("../moongose/models/department.mongoose.model");
const education_mongoose_model_1 = require("../moongose/models/education.mongoose.model");
const position_mongoose_model_1 = require("../moongose/models/position.mongoose.model");
function formatDate(params) {
    if (typeof params === "string") {
        const date = params.split("/");
        return {
            day: (parseInt(date[0]) + 1).toString(),
            month: (parseInt(date[1]) - 1).toString(),
            year: date[2]
        };
    }
    return params;
}
function setContractDay(params) {
    let [month, date, year] = params.toLocaleDateString().split("/");
    let contractYear = parseInt(year) + 5;
    return new Date(contractYear, +month, +date);
}
class EmployeeController {
    createEmployees(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, fullName, avatarUrl, gender, birthPlace, birthDay, educationId, departmentId, positionId, identityNumber, address, homeTown, phoneNumber, note, email } = req.body;
            const newEmployee = new employee_mongoose_model_1.EmployeeModel({
                name,
                fullName,
                avatarUrl,
                gender,
                birthPlace,
                birthDay,
                educationId,
                departmentId,
                positionId,
                identityNumber,
                address,
                homeTown,
                phoneNumber,
                joinDate: new Date(),
                contractExpirationDate: setContractDay(new Date()),
                note,
                email
            });
            // TODO: add field createdBy with user id
            yield newEmployee.save((err, value) => {
                if (err)
                    return next(err);
                res.status(201).send(newEmployee);
            });
        });
    }
    deleteEmployee(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundEmployee = yield employee_mongoose_model_1.EmployeeModel.findById(req.body.id);
                if (!foundEmployee)
                    return res.status(400).send("Employee not found");
                // TODO: Check user role for edit employee
                const deletedEmployee = yield employee_mongoose_model_1.EmployeeModel.findByIdAndDelete(req.body.id);
                res.status(200).send(deletedEmployee);
            }
            catch (err) {
                res.status(400).send("Failed!");
            }
            return next();
        });
    }
    editEmployee(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // TODO: Check user role for edit employee
                const foundEmployee = yield employee_mongoose_model_1.EmployeeModel.findById(req.body.id);
                if (!foundEmployee)
                    return res.status(400).send("Employee not found");
                const foundDepartment = yield department_mongoose_model_1.DepartmentModel.findById(req.body.departmentId);
                if (!foundDepartment)
                    return res.status(400).send("Department not found");
                const foundEducation = yield education_mongoose_model_1.EducationModel.findById(req.body.educationId);
                if (!foundEducation)
                    return res.status(400).send("Education not found");
                const foundPosition = yield position_mongoose_model_1.PostionModel.findById(req.body.positionId);
                if (!foundPosition)
                    return res.status(400).send("Position not found");
                const { name, fullName, avatarUrl, gender, birthPlace, birthDay, educationId, departmentId, positionId, identityNumber, address, homeTown, phoneNumber, note, email } = req.body;
                const formatedBirthDay = formatDate(birthDay);
                if (name !== undefined)
                    foundEmployee.name = name;
                if (fullName !== undefined)
                    foundEmployee.fullName = fullName;
                if (avatarUrl !== undefined)
                    foundEmployee.avatarUrl = avatarUrl;
                if (gender !== undefined)
                    foundEmployee.gender = gender;
                if (birthPlace !== undefined)
                    foundEmployee.birthPlace = birthPlace;
                if (birthDay !== undefined)
                    foundEmployee.birthDay = birthDay;
                {
                    foundEmployee.educationId = educationId;
                    foundEmployee.departmentId = departmentId;
                    foundEmployee.positionId = positionId;
                }
                if (identityNumber !== undefined)
                    foundEmployee.identityNumber = identityNumber;
                if (address !== undefined)
                    foundEmployee.address = address;
                if (homeTown !== undefined)
                    foundEmployee.homeTown = homeTown;
                if (phoneNumber !== undefined)
                    foundEmployee.phoneNumber = phoneNumber;
                if (note !== undefined)
                    foundEmployee.note = note;
                if (email !== undefined)
                    foundEmployee.email = email;
                const savedEmployee = yield foundEmployee.save();
                res.status(200).json(savedEmployee);
            }
            catch (err) {
                res.status(400).json(err);
            }
            return next();
        });
    }
    loadEmployeeById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundEmployee = yield employee_mongoose_model_1.EmployeeModel.findById(req.params.id)
                    .populate("educationId", "_id educationName")
                    .populate("positionId", "_id positionName")
                    .populate("departmentId", "_id departmentName");
                if (!foundEmployee)
                    return res.status(400).send("Employee not found!");
                res.status(200).json(foundEmployee);
            }
            catch (error) {
                res.status(400).send("Failed");
            }
            return next();
        });
    }
    loadEmployees(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundEmployees = yield employee_mongoose_model_1.EmployeeModel.find()
                    .lean()
                    .populate("educationId", "_id educationName")
                    .populate("positionId", "_id positionName")
                    .populate("departmentId", "_id departmentName");
                res.status(200).json(foundEmployees);
            }
            catch (error) {
                res.status(400).send("Failed");
            }
            return next();
        });
    }
}
exports.EmployeeController = EmployeeController;
