"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const department_controller_1 = require("../controller/department.controller");
const passport_1 = require("../config/passport");
const router = express_1.default.Router();
const departmentController = new department_controller_1.DepartmentController();
router.post("/", passport_1.authJwt, departmentController.createDepartment);
router.get("/", passport_1.authJwt, departmentController.getAllDepartments);
router.get("/:id", passport_1.authJwt, departmentController.getDepartmentById);
router.put("/", passport_1.authJwt, departmentController.editDepartment);
router.delete("/", passport_1.authJwt, departmentController.deleteDepartment);
exports.default = router;
