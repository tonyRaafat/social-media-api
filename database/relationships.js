import { commentModel } from "./models/comment.model.js"
import { postModel } from "./models/post.model.js"
import userModel from "./models/user.model.js"

userModel.hasMany(postModel,{
    onDelete:'CASCADE',
    onUpdate:'CASCADE',
    
})
userModel.hasMany(commentModel,{
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
})

postModel.hasMany(commentModel,{
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
})

postModel.belongsTo(userModel,{foreignKey: {
    name:"userId",
    allowNull: false,
  }})

commentModel.belongsTo(postModel,{foreignKey: {
    name:"postId",
    allowNull:false
  }})
commentModel.belongsTo(userModel,{foreignKey: {
    name:"userId",
    allowNull: false,
  }})
