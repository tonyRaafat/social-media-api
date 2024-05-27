import { Router } from 'express';
import { createPost, deletePost, getPostById, getPosts, updatePost } from './posts.controllers.js';
import { validateCreatePost } from '../../middlewares/validateCreatePost.middleware.js';

const router = Router();

router.route('/').get(getPosts).post(validateCreatePost,createPost);
router.route('/:id').get(getPostById).put(updatePost).delete(deletePost)

// router.post('/', createPost);
// router.get('/', getPosts);
// router.get('/:id', getPostById);
// router.put('/:id', updatePost);
// router.delete('/:id', deletePost);

export default router;