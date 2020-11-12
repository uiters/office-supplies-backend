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
exports.EducationController = void 0;
const employee_mongoose_model_1 = require("../moongose/models/employee.mongoose.model");
const education_mongoose_model_1 = require("../moongose/models/education.mongoose.model");
class EducationController {
    createEducation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { educationName } = req.body;
            const newEducation = new education_mongoose_model_1.EducationModel({
                educationName
                //   TODO: Add field createdBy: user._id
            });
            yield newEducation.save(err => {
                if (err)
                    return next(err);
                res.status(201).json(newEducation);
            });
        });
    }
    deleteEducation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // TODO: check user role before delete Education
                const foundEducation = yield education_mongoose_model_1.EducationModel.findById(req.body.id);
                if (!foundEducation)
                    return res.status(400).send("Education not found");
                const deletedEducation = yield education_mongoose_model_1.EducationModel.findByIdAndDelete(foundEducation._id);
                if (!deletedEducation)
                    return res.status(400).send("Failed");
                const foundEmployees = yield employee_mongoose_model_1.EmployeeModel.find({
                    educationId: deletedEducation._id
                });
                if (foundEmployees && foundEmployees.length) {
                    const promises = foundEmployees.map(employee => {
                        employee.educationId = null;
                    });
                    yield Promise.all(promises);
                }
                res.status(200).json(deletedEducation);
            }
            catch (error) {
                res.status(400).send("failed");
            }
            return next();
        });
    }
    editEducation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundEducation = yield education_mongoose_model_1.EducationModel.findById(req.body.id);
                if (!foundEducation)
                    return res.status(400).send("Education not found!");
                const { educationName } = req.body;
                if (educationName !== undefined)
                    foundEducation.educationName = educationName;
                const savedEducation = yield foundEducation.save();
                res.status(200).json(savedEducation);
            }
            catch (error) {
                res.status(400).send("Failed");
            }
            return next();
        });
    }
    getAllEducations(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundEducations = yield education_mongoose_model_1.EducationModel.find();
                if (!foundEducations)
                    return res.status(400).send("Education not found!");
                res.status(200).json(foundEducations);
            }
            catch (error) {
                res.status(400).send("Failed");
            }
            return next();
        });
    }
    getEducationById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundEducation = yield education_mongoose_model_1.EducationModel.findById(req.params.id);
                if (!foundEducation)
                    return res.status(400).send("Education not found");
                res.status(200).json(foundEducation);
            }
            catch (error) {
                res.status(400).send("Failed");
            }
            return next();
        });
    }
}
exports.EducationController = EducationController;
