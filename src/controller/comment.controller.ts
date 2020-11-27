import { NextFunction, Response } from 'express';
import { CommentService } from '../service/comment.service';
import { AuthRequest } from '../types/utils';

const commentService = new CommentService();
export class CommentController {
    public async createComment(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { _id } = req.user;
            const { productId, comment } = req.body;
            const userId = _id;
            const newComment = await commentService.createComment({ userId, productId, comment });
            if (!newComment) return res.status(400).json('Failed');
            res.status(201).json(newComment);
        } catch (error) {
            res.status(400).json('Failed');
        }
        return next();
    }

    public async deleteComment(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const deletedComment = await commentService.deleteComment(id);
            if (!deletedComment) return res.status(404).json('Not found');
            res.status(200).json(deletedComment);
        } catch (error) {
            res.status(400).json('Failed');
        }
        return next();
    }

    public async getComments(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const foundComments = await commentService.getComments();
            return res.status(200).json(foundComments);
        } catch (error) {
            res.status(400).json('Failed');
        }
        return next();
    }
}
