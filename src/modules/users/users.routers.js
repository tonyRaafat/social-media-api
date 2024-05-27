import { Router } from "express";
import { signup } from "./users.controllers.js";
import { validateUser } from "../../middlewares/validateUser.middleware.js";

const router = Router();

router.post('/signup', validateUser,signup);

export default router