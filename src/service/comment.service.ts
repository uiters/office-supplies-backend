import { ICommentModel } from '../models/comments.model';
import { CommentModel } from '../mongoose/comment.mongoose';

export class CommentService {
    public async createComment(data: ICommentModel) {
        const newComment = await CommentModel.create({
            userId: data.userId,
            productId: data.productId,
            comment: data.comment,
        });
        console.log(newComment);
        return newComment;
    }

    public async deleteComment(commentId: string) {
        const deletedComment = await CommentModel.findByIdAndDelete(commentId);
        if (!deletedComment) return null;
        return deletedComment;
    }

    public async getComments() {
        const foundComments = await CommentModel.find();
        return foundComments;
    }

    public async getCommentById(commentId: string) {
        const foundComment = await CommentModel.findById(commentId);
        if (!foundComment) return null;
        return foundComment;
    }
}
