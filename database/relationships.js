import { commentModel } from "./models/comment.model.js"
import { postModel } from "./models/post.model.js"
import { userModel } from "./models/user.model.js"

userModel.hasMany(postModel,{
    foreignKey:{
      name:"authorId",
      allowNull:false
    },
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

postModel.belongsTo(userModel,{
  as:'author',
  foreignKey:{
    name:"authorId",
    allowNull:false
  }
})

commentModel.belongsTo(postModel)
commentModel.belongsTo(userModel)
