import { userModel } from "../../database/models/user.model.js";
import throwError from "../../utils/throwError.utils.js";

export async function validateCreateComment(req, res, next) {
    try {
        const {  content, userId ,postId} = req.body;

        if (!content || !userId || !postId) {
            throw throwError('body must contain content, postId, and userId',400)
        }

        const user = await userModel.findByPk(userId);
        if (!user) {
            throw throwError('user not found',404)
        }

        next();
    } catch (error) {
        next(error)
    }
}