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
        const user = await userModel.findOne({ where: { email: email }})
        if (user !== null) {
            const result = await bcrypt.compare(password, user.dataValues.password)
            if (!result) {
                return res.status(400).send({ message: "Wrong password" })
            }
            delete user.dataValues.password
            return res.json({ message: "Success",user: user.dataValues })
        } else {
            return res.status(404).send({ message: "User not Found" })
        }

    } catch (error) {
        next(error)
    }
}