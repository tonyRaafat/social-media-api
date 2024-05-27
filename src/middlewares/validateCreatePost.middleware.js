import { userModel } from "../../database/models/user.model.js";
import throwError from "../../utils/throwError.utils.js";

export async function validateCreatePost(req, res, next) {
    try {
        const { title, content, authorId } = req.body;

        if (!title || !content || !authorId) {
            throw throwError('body must contain Title, content, and authorId',400)
        }

        const author = await userModel.findByPk(authorId);
        if (!author) {
            throw throwError('Author not found',404)
        }

        next();
    } catch (error) {
        next(error)
    }
}