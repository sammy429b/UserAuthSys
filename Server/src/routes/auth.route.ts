import {Router} from 'express'
import {registerController, loginController, logoutController} from "../controllers/auth.controller"
const router = Router();

router.post("/register", registerController)
router.post("/login", loginController)
router.get("/logout", logoutController)


export default router;