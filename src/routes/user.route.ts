import express from "express";
import { authJwt } from "../config/passport";
import { UserController } from "../controller/user.controller";
import { isAdmin } from "../util/permission.util";
import {
  createUserValidators,
  editUserValidators
} from "../util/validatiors/user.validate";

const router = express.Router();

const userController = new UserController();

router.get("/user-id/:id", authJwt, userController.getUserById);
router.get("/me", authJwt, userController.getMe);
router.get("/email-verification/:token", userController.verifyUser);
router.get("/reset-password/:token", userController.resetPassword);

// http://localhost:3000/user/?page=
router.get("/", authJwt, isAdmin, userController.getUser);

router.put("/", authJwt, userController.updateUser);
router.put("/change-password", authJwt, userController.changePassword);
router.post("/", createUserValidators, userController.createUser);
router.post("/forgot-password", userController.forgotPassword);

router.delete("/:id", authJwt, isAdmin, userController.deleteUser);

export default router;
