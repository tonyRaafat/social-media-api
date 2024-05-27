import { Router } from 'express';
import { createcomment, deletecomment, getcommentById, getcomments, updatecomment } from './comments.controllers.js';
import { validateCreateComment } from '../../middlewares/validateCreateComment.middleware.js';

const router = Router();

router.route('/').get(getcomments).post(validateCreateComment,createcomment);
router.route('/:id').get(getcommentById).put(updatecomment).delete(deletecomment)

export default router;