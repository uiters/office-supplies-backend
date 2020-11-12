import express from 'express';
import { authLocal } from '../config/passport';
import AuthController from '../controller/auth.controller';
import { loginValidate } from '../util/validatiors/auth.validate';

const router = express.Router();
const authController = new AuthController();

router.post('/login', authLocal, authController.postLogin);

export default router;