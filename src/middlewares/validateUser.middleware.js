import userModel from "../../database/models/user.model.js";
import throwError from "../../utils/throwError.utils.js";

export async function validateUser(req,res,next){
    try{
        const {username, email, password} = req.body
        if(!username || !email || !password){
            throw throwError("body must contain username, email and password",400)
        }
        const user = await userModel.findOne({where:{email:email}})
        if(user !== null){
            throw throwError("user already exist",400)
        }else{
            next()
        }
    }catch(err){
        next(err)
    }

}