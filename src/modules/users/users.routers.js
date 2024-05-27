import { Router } from "express";
import { signup,login,logout } from "./users.controllers.js";
import { validateUserSignUp, validateLoginBody } from "../../middlewares/validateUser.middleware.js";

const router = Router()

router.post('/signup', validateUserSignUp,signup)
router.get('/login',validateLoginBody,login)
router.get('/logout',validateLoginBody,logout)

export default router