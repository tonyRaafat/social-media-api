import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection.js";

export const userModel = sequelize.define(
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
            type:DataTypes.STRING(100),
            allowNull:false,
        }
    },{
        timestamps:false
    }
)