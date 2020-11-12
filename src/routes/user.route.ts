import express from 'express';
import { authJwt } from '../config/passport';
import { UserController } from '../controller/user.controller';
import { isAdmin } from '../util/permission.util';
import { createUserValidators, editUserValidators } from '../util/validatiors/user.validate';

const router = express.Router();

const userController = new UserController();

router.get('/:id', authJwt, isAdmin, userController.getUserById);
router.get('/me', authJwt, userController.getMe);
router.get('/email-verification/:token', userController.verifyUser);

router.put('/', authJwt, editUserValidators, userController.updateUser);
router.post('/', createUserValidators, userController.createUser);

router.delete('', authJwt, isAdmin, userController.deleteUser);

export default router;
