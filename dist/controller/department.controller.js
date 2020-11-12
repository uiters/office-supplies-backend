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
exports.DepartmentController = void 0;
const department_mongoose_model_1 = require("../moongose/models/department.mongoose.model");
const employee_mongoose_model_1 = require("../moongose/models/employee.mongoose.model");
class DepartmentController {
    createDepartment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { departmentName } = req.body;
            const newDepartment = new department_mongoose_model_1.DepartmentModel({
                departmentName
            });
            yield newDepartment.save(err => {
                if (err)
                    return next(err);
                res.status(201).json(newDepartment);
            });
        });
    }
    deleteDepartment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // TODO: check user role before delete department
                const foundDepartment = yield department_mongoose_model_1.DepartmentModel.findById(req.body.id);
                if (!foundDepartment)
                    return res.status(400).send("Department not found");
                const deletedDepartment = yield department_mongoose_model_1.DepartmentModel.findByIdAndDelete(foundDepartment._id);
                if (!deletedDepartment)
                    return res.status(400).send("Failed");
                const foundEmployees = yield employee_mongoose_model_1.EmployeeModel.find({
                    departmentId: deletedDepartment._id
                });
                if (foundEmployees && foundEmployees.length) {
                    const promises = foundEmployees.map(employee => {
                        employee.departmentId = null;
                    });
                    yield Promise.all(promises);
                }
                res.status(200).json(deletedDepartment);
            }
            catch (error) {
                res.status(400).send("failed");
            }
            return next();
        });
    }
    editDepartment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundDepartment = yield department_mongoose_model_1.DepartmentModel.findById(req.body.id);
                if (!foundDepartment)
                    return res.status(400).send("Department not found!");
                const { departmentName } = req.body;
                if (departmentName !== undefined)
                    foundDepartment.departmentName = departmentName;
                const savedDepartment = yield foundDepartment.save();
                res.status(200).json(savedDepartment);
            }
            catch (error) {
                res.status(400).send("Failed");
            }
            return next();
        });
    }
    getAllDepartments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundDeparments = yield department_mongoose_model_1.DepartmentModel.find();
                if (!foundDeparments)
                    return res.status(400).send("Department not found!");
                res.status(200).json(foundDeparments);
            }
            catch (error) {
                res.status(400).send("Failed");
            }
            return next();
        });
    }
    getDepartmentById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundDepartment = yield department_mongoose_model_1.DepartmentModel.findById(req.params.id);
                if (!foundDepartment)
                    return res.status(400).send("Department not found");
                res.status(200).json(foundDepartment);
            }
            catch (error) {
                res.status(400).send("Failed");
            }
            return next();
        });
    }
}
exports.DepartmentController = DepartmentController;
