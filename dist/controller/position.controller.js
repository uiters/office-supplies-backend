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
exports.PositionController = void 0;
const employee_mongoose_model_1 = require("../moongose/models/employee.mongoose.model");
const position_mongoose_model_1 = require("../moongose/models/position.mongoose.model");
class PositionController {
    createPosition(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { positionName } = req.body;
            const newPosition = new position_mongoose_model_1.PostionModel({
                positionName
                //   TODO: Add field createdBy: user._id
            });
            yield newPosition.save(err => {
                if (err)
                    return next(err);
                res.status(201).json(newPosition);
            });
        });
    }
    deletePosition(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // TODO: check user role before delete Education
                const foundPosition = yield position_mongoose_model_1.PostionModel.findById(req.body.id);
                if (!foundPosition)
                    return res.status(400).send("Department not found");
                const deletedPosition = yield position_mongoose_model_1.PostionModel.findByIdAndDelete(foundPosition._id);
                if (!deletedPosition)
                    return res.status(400).send("Failed");
                const foundEmployees = yield employee_mongoose_model_1.EmployeeModel.find({
                    positionId: deletedPosition._id
                });
                if (foundEmployees && foundEmployees.length) {
                    const promises = foundEmployees.map(employee => {
                        employee.educationId = null;
                    });
                    yield Promise.all(promises);
                }
                res.status(200).json(deletedPosition);
            }
            catch (error) {
                res.status(400).send("failed");
            }
            return next();
        });
    }
    editPosition(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundPosition = yield position_mongoose_model_1.PostionModel.findById(req.body.id);
                if (!foundPosition)
                    return res.status(400).send("Department not found!");
                const { positionName } = req.body;
                if (positionName !== undefined)
                    foundPosition.positionName = positionName;
                const savedPosition = yield foundPosition.save();
                res.status(200).json(savedPosition);
            }
            catch (error) {
                res.status(400).send("Failed");
            }
            return next();
        });
    }
    getAllPositions(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundPositions = yield position_mongoose_model_1.PostionModel.find();
                if (!foundPositions)
                    return res.status(400).send("Positions not found!");
                res.status(200).json(foundPositions);
            }
            catch (error) {
                res.status(400).send("Failed");
            }
            return next();
        });
    }
    getPositionById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundPosition = yield position_mongoose_model_1.PostionModel.findById(req.params.id);
                if (!foundPosition)
                    return res.status(400).send("Position not found");
                res.status(200).json(foundPosition);
            }
            catch (error) {
                res.status(400).send("Failed");
            }
            return next();
        });
    }
}
exports.PositionController = PositionController;
