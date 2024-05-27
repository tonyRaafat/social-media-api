import { commentModel } from "../../../database/models/comment.model.js"
import { postModel } from "../../../database/models/post.model.js"
import { userModel } from "../../../database/models/user.model.js"
import bcrypt from 'bcrypt'

export async function signup(req, res, next) {
    try {
        const saltRounds = 10
        const { username, email, password } = req.body
        const hash = await bcrypt.hash(password, saltRounds)
        userModel.create({ username, email, password: hash })
        return res.status(201).send({ message: "success" })
    } catch (err) {
        next(err)
    }
}

export async function login(req, res, next) {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ where: { email: email } })
        if (user !== null) {
            const match = await bcrypt.compare(password, user.dataValues.password)
            if (!match) {
                return res.status(400).send({ message: "Wrong password" })
            }
            user.loggedIn = true
            await user.save()
            let data = structuredClone(user);
            delete data.dataValues.password
            return res.json({ message: "Success", user: data.dataValues })
        } else {
            return res.status(404).send({ message: "User not Found" })
        }

    } catch (error) {
        next(error)
    }
}

export async function logout(req, res, next) {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ where: { email: email } })
        if (user !== null) {
            const match = await bcrypt.compare(password, user.dataValues.password)
            if (!match) {
                return res.status(400).send({ message: "Wrong password" })
            }
            user.loggedIn = false
            await user.save()
            let data = structuredClone(user);
            delete data.dataValues.password
            return res.json({ message: "Success", user: data.dataValues })
        } else {
            return res.status(404).send({ message: "User not Found" })
        }

    } catch (error) {
        next(error)
    }
}

export async function getUserWithPostAndComments(req, res, next) {
    try {
        const { id, postid } = req.params;
        const user = await userModel.findByPk(id, {
            include: [{
                model: postModel,
                // as: 'posts',
                where: { id: postid },
                include: [{
                    model: commentModel,
                    // as: 'comments',
                    include: [{ model: userModel,  attributes: ['id', 'username', 'email'] }]
                }]
            }]
        });

        if (!user) {
            return res.status(404).json({ error: 'bad request' });
        }

        res.json(user);
    } catch (error) {
        next(error)
    }
}