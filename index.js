import express from "express";
import { sequelize } from "./database/dbConnection.js";
import "./database/relationships.js"
import userRouter from './src/modules/users/users.routers.js'
import postsRouter from './src/modules/posts/posts.routers.js'
import errorHandler from "./utils/errorHanler.utils.js";

const app = express()
const port = 3000

app.use(express.json())

app.use('/users', userRouter)
app.use('/posts', postsRouter)

app.all('*', (req, res, next) => {
    const error = new Error(`Cannot ${req.method} ${req.originalUrl}`)
    error.statusCode = 404
    next(error)
})

app.use(errorHandler)

sequelize.sync().then(() => {
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
});