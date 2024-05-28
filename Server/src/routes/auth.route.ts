import {Router} from 'express'
import {registerController, loginController, changePasswordController, sendOTPController} from "../controllers/auth.controller"
const router = Router();

router.post("/register", registerController)
router.post("/login", loginController)
router.post("/password/email", sendOTPController)
// router.put("/password/reset", forgotPasswordController)
router.put("/password/change", changePasswordController)

export default router;