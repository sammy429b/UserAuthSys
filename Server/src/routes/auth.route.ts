import {Router} from 'express'
import {registerController, loginController, changePasswordController} from "../controllers/auth.controller"
const router = Router();

router.post("/register", registerController)
router.post("/login", loginController)
router.put("/password", changePasswordController)

export default router;