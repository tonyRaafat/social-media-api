import { postModel } from "../../../database/models/post.model.js";
import { userModel } from "../../../database/models/user.model.js";


export async function createPost(req, res, next) {
    try {

        const { title, content, authorId } = req.body;
        const post = await postModel.create({ title, content, author: authorId });
        res.status(201).json(post);
    } catch (error) {
        next(error)
    }
};

export async function getPosts(req, res, next) {
    try {
        const posts = await postModel.findAll();
        res.status(200).json(posts);
    } catch (error) {
        next(error)
    }
}

export async function getPostById(req, res, next) {
    try {
        const post = await postModel.findByPk(req.params.id, { include: 'author' });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        next(error)
    }

}

export async function updatePost(req, res, next) {
    try {
        const { title, content } = req.body;
        const post = await postModel.findByPk(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        if (title) {
            post.title = title;
        }
        if (content) {
            post.content = content;
        }
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        next(error)
    }
}

export async function deletePost(req, res, next) {
    try {
        const post = await postModel.findByPk(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        await post.destroy();
        res.status(204).json({message:"delete is successful"});
    } catch (error) {
        next(error)
    }
}