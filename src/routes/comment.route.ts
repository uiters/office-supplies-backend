import express from 'express';
import { authJwt } from '../config/passport';
import { CommentController } from '../controller/comment.controller';
import { createCommentLimiter } from '../util/limit-request.util';
import { isAdmin } from '../util/permission.util';
import { createCommentValidate } from '../util/validatiors/comment.validate';

const router = express.Router();
const commentController = new CommentController();

router.get('/', commentController.getComments);
router.post(
    '/',
    authJwt,
    createCommentValidate,
    createCommentLimiter,
    commentController.createComment
);
router.delete('/:id', authJwt, isAdmin, commentController.deleteComment);

export default router;
