import { Router } from 'express';
import { createPost, deletePost, getPostById, getPosts, getPostByIdDetailed ,updatePost } from './posts.controllers.js';
import { validateCreatePost } from '../../middlewares/validateCreatePost.middleware.js';

const router = Router();

router.route('/').get(getPosts).post(validateCreatePost,createPost);
router.route('/:id').get(getPostById).put(updatePost).delete(deletePost)
router.get('/:id/detailed',getPostByIdDetailed)

export default router;