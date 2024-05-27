import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection.js";
import {postModel} from "./post.model.js";
import { commentModel } from "./comment.model.js";

const userModel = sequelize.define(
    'user',
    {
        username:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING(8),
            allowNull:false,
        }
    },{
        timestamps:false
    }
)



export default userModel