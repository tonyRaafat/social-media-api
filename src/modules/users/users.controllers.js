import userModel from "../../../database/models/user.model.js"
import bcrypt from 'bcrypt'
export async function signup(req, res, next) {
    try {
        const saltRounds = 10
        const { username, email, password } = req.body
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) {
                return res.status(500).send(err)
            }
            userModel.create({ username, email, password: hash })
            return res.status(500).send({message:"success"})

        });
    } catch (err) {
        next(err)
    }
}