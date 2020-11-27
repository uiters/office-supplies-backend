import express from "express";
import { authJwt } from "../config/passport";
import ProductTypeController from "../controller/productType.controller";
import { isAdmin } from "../util/permission.util";
import { typeValidate } from "../util/validatiors/productType.validate";

const router = express.Router();
const typeController = new ProductTypeController();

router.get("/", typeController.getType);

router.post("/", authJwt, isAdmin, typeValidate, typeController.createType);
router.put("/", authJwt, isAdmin, typeController.updateType);

router.delete("/:id", authJwt, isAdmin, typeController.deleteType);

export default router;
