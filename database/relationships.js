import { commentModel } from "./models/comment.model.js"
import { postModel } from "./models/post.model.js"
import userModel from "./models/user.model.js"

userModel.hasMany(postModel,{
    foreignKey:{
      name:"author",
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
  foreignKey:{
    name:"author",
    allowNull:false
  }
})

commentModel.belongsTo(postModel)
commentModel.belongsTo(userModel)
