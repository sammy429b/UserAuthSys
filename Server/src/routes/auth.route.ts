import {Router} from 'express'
import userController from "../controllers/auth.controller"
const router = Router();

router.post("/register", userController)

export default router;