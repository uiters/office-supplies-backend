"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const education_controller_1 = require("../controller/education.controller");
const passport_1 = require("../config/passport");
const router = express_1.default.Router();
const educationController = new education_controller_1.EducationController();
router.post("/", passport_1.authJwt, educationController.createEducation);
router.get("/", passport_1.authJwt, educationController.getAllEducations);
router.get("/:id", passport_1.authJwt, educationController.getEducationById);
router.put("/", passport_1.authJwt, educationController.editEducation);
router.delete("/", passport_1.authJwt, educationController.deleteEducation);
exports.default = router;
