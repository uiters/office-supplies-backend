"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employee_controller_1 = require("../controller/employee.controller");
const passport_1 = require("../config/passport");
const employee_validator_1 = require("../util/validatiors/employee.validator");
const router = express_1.default.Router();
const employeeController = new employee_controller_1.EmployeeController();
router.get("/", passport_1.authJwt, employeeController.loadEmployees);
router.get("/:id", passport_1.authJwt, employeeController.loadEmployeeById);
router.post("/", passport_1.authJwt, employee_validator_1.createEmployeeValidators, employeeController.createEmployees);
router.put("/", passport_1.authJwt, employee_validator_1.editEmployeeValidators, employeeController.editEmployee);
router.delete("/", passport_1.authJwt, employeeController.deleteEmployee);
exports.default = router;
