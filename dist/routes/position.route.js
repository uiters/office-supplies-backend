"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const position_controller_1 = require("../controller/position.controller");
const passport_1 = require("../config/passport");
const router = express_1.default.Router();
const positionController = new position_controller_1.PositionController();
router.post("/", passport_1.authJwt, positionController.createPosition);
router.get("/", passport_1.authJwt, positionController.getAllPositions);
router.get("/:id", passport_1.authJwt, positionController.getPositionById);
router.put("/", passport_1.authJwt, positionController.editPosition);
router.delete("/", passport_1.authJwt, positionController.deletePosition);
exports.default = router;
