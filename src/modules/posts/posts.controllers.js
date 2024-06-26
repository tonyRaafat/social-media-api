import { postModel } from "../../../database/models/post.model.js";
import { userModel } from "../../../database/models/user.model.js";

export async function createPost(req, res, next) {
    try {

        const { title, content, authorId } = req.body;
        const post = await postModel.create({ title, content, authorId });
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
        const post = await postModel.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        next(error)
    }

}

export async function getPostByIdDetailed(req, res, next) {
    try {
        const { id } = req.params;
        const post = await postModel.findByPk(id, {
            
            include: [{ model: userModel,as:'author', attributes: ['id', 'username', 'email'] }],
        });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        
        res.json(post);
    } catch (error) {
        next(error)
    }
}

export async function updatePost(req, res, next) {
    try {
        const { title, content, authorId } = req.body;
        const post = await postModel.findByPk(req.params.id);
        if (!authorId) {
            return res.status(400).json({ error: 'body must contain authorId' });
        }

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        if (post.authorId !== authorId) {
            return res.status(401).json({ error: 'unauthorized access' });
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
        const { authorId } = req.body
        const post = await postModel.findByPk(req.params.id);
        console.log(post);
        if (!authorId) {
            return res.status(400).json({ error: 'body must contain authorId' });
        }

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        if (post.authorId !== authorId) {
            return res.status(401).json({ error: 'unauthorized access' });
        }
        await post.destroy();
        res.status(204).json({ message: "delete is successful" });
    } catch (error) {
        next(error)
    }
}