import { commentModel } from "../../../database/models/comment.model.js";

export async function createcomment(req, res, next) {
    try {

        const { content, userId,postId } = req.body;
        const comment = await commentModel.create({ content, userId, postId });
        res.status(201).json(comment);
    } catch (error) {
        next(error)
    }
};

export async function getcomments(req, res, next) {
    try {
        const comments = await commentModel.findAll();
        res.status(200).json(comments);
    } catch (error) {
        next(error)
    }
}

export async function getcommentById(req, res, next) {
    try {
        const comment = await commentModel.findByPk(req.params.id);
        if (!comment) {
            return res.status(404).json({ error: 'comment not found' });
        }
        res.status(200).json(comment);
    } catch (error) {
        next(error)
    }

}

export async function updatecomment(req, res, next) {
    try {
        const { content, userId } = req.body;
        const comment = await commentModel.findByPk(req.params.id);
        if(!userId){
            return res.status(400).json({ error: 'body must contain userId' });
        }
        
        if (!comment) {
            return res.status(404).json({ error: 'comment not found' });
        }
        if (comment.userId !== userId) {
            return res.status(401).json({ error: 'unauthorized access' });
        }
        if (content) {
            comment.content = content;
        }
        await comment.save();

        res.status(200).json(comment);
    } catch (error) {
        next(error)
    }
}

export async function deletecomment(req, res, next) {
    try {
        const { userId } = req.body
        const comment = await commentModel.findByPk(req.params.id);
        console.log(comment);
        if(!userId){
            return res.status(400).json({ error: 'body must contain userId' });
        }

        if (!comment) {
            return res.status(404).json({ error: 'comment not found' });
        }
        if (comment.userId !== userId) {
            return res.status(401).json({ error: 'unauthorized access' });
        }
        await comment.destroy();
        return res.status(204).json({ message: "delete is successful" });
    } catch (error) {
        next(error)
    }
}